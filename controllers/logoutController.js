const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("node:fs/promises");
const path = require("node:path");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No Content

  const refreshToken = cookies.jwt;

  const foundUser = usersDB.users.find((person) => {
    return person.refreshToken === refreshToken;
  });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  const otherUsers = usersDB.users.filter((person) => {
    return person.refreshToken !== foundUser.refreshToken;
  });

  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, "..", "models", "users.json"),
    JSON.stringify(usersDB.users)
  );

  res.clearCookie("jwt", { httpOnly: true });
  sendStatus(204);
};

module.exports = { handleLogout };
