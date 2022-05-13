import morgan, { StreamOptions } from "morgan";

import { logger } from "./logger";

const stream: StreamOptions = {
  write: (message) => logger.http(message),
};

const skip = (): boolean => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const middlewareLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

export { middlewareLogger };
