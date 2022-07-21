import { Logger, LoggerOptions } from "./index.ts";

const loggerOptions: LoggerOptions = {
  level: "INFO",
  json: false,
  name: "user-svc",
};

const logger = new Logger(loggerOptions);

logger.info("It's working!");
