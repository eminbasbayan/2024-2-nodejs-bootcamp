const usersDB = {
  users: require("../models/users.json"),
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res.status(400).json({
      message: "Username and password are required!",
    });
  }

  const foundUser = usersDB.users.find((person) => person.username === user);

  if (!foundUser) {
    return res.status(401).json({
      message: "Böyle bir kullanıcı bulunamadı!",
    });
  }

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "30s",
      }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "1d",
      }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // one day
    });

    return res.status(200).json({
      accessToken,
      success: `user ${user} is log in!`,
    });
  }

  res.status(401).json({
    message: "Şifre yanlış!",
  });
};

module.exports = {
  handleLogin,
};
