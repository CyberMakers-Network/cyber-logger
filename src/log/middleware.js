const morgan = require("morgan");

const log = require("./logger");

const logTemplate =
  ":method :url :status :res[content-length] - :response-time ms";

const stream = {
  write: (message) => log.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const middlewareLogger = morgan(logTemplate, { stream, skip });

module.exports = middlewareLogger;
