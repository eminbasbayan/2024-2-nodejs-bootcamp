const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleNewUser = (req, res) => {
  const user = req.body.user;
  const pwd = req.body.pwd;

  if (!user || !pwd) {
    return res.status(400).json({
      message: "Username and password are required!",
    });
  }

  try {
    const newUser = {
      username: user,
      password: pwd,
    };

    usersDB.setUsers([...usersDB.users, newUser]);
    console.log(usersDB.users);
    
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
