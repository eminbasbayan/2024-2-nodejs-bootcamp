const handleNewUser = (req, res) => {
  const user = req.body.user;
  const pwd = req.body.pwd;

  if (!user || !pwd) {
    return res.status(400).json({
      message: "Username and password are required!",
    });
  }

  res.status(201).json({
    success: `New user ${user} created!`,
  });
};

module.exports = {
  handleNewUser,
};
