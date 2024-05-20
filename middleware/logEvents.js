const { v4: uuid } = require("uuid");
const { format } = require("date-fns");

const logEvents = async (message, fileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}`;
  console.log(logItem);
};

module.exports = logEvents;

//  id, fs, path
