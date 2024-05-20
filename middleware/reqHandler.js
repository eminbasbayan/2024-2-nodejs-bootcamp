const logEvents = require("./logEvents");

const reqHandler = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  next();
};

module.exports = reqHandler;