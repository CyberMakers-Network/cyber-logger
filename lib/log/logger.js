const winston = require("winston");

/**
 * Winston set levels for config logger
 *
 * @param { Object }
 */
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

/**
 * Color index for logger text in console
 *
 * @type { winston.config.AbstractConfigSetColors }
 */
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

winston.addColors(colors);

/**
 * Text format for console logger
 *
 * @type { winston.Logform.Format }
 */
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

/**
 * Configuration for create log files
 *
 * @type { winston.transports.ConsoleTransportInstance | winston.transports.FileTransportInstance [] }
 */
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new winston.transports.File({ filename: "logs/all.log" }),
];

/**
 * Create a Winston module with configuration
 *
 * @type { winston.Logger }
 */
const log = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

module.exports = log;
