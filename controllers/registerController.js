const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("node:fs/promises");
const path = require("node:path");

const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const user = req.body.user;
  const pwd = req.body.pwd;

  if (!user || !pwd) {
    return res.status(400).json({
      message: "Username and password are required!",
    });
  }

  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409);

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const newUser = {
      username: user,
      password: hashedPwd,
    };

    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersDB.users)
    );

    res.status(201).json({
      success: `New user ${user} created!`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleNewUser,
};
