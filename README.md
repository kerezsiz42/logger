# kerezsiz42/logger

Supported logger levels in order:
```ts
type LoggerLevel =
  | "DEBUG"
  | "INFO"
  | "WARNING"
  | "ERROR"
  | "CRITICAL";
```

## Usage:
```ts
import { Logger, LoggerOptions } from "https://raw.githubusercontent.com/kerezsiz42/logger/master/index.ts";

const loggerOptions: LoggerOptions = {
  level: "INFO",
  json: false,
  name: "user-svc",
};

const logger = new Logger(loggerOptions);

logger.info("It's working!");
```