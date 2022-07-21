// deno-lint-ignore-file no-explicit-any
const levelOrder = {
  DEBUG: 0,
  INFO: 1,
  WARNING: 2,
  ERROR: 3,
  CRITICAL: 4,
};

const levelColors = {
  DEBUG: "color: white",
  INFO: "color: blue",
  WARNING: "color: orange",
  ERROR: "color: red",
  CRITICAL: "background-color: red",
};

export type LoggerLevel =
  | "DEBUG"
  | "INFO"
  | "WARNING"
  | "ERROR"
  | "CRITICAL";

export interface LoggerOptions {
  level?: LoggerLevel;
  json?: boolean;
  name?: string;
}

export class Logger {
  private levelNumber: number;
  private json: boolean;
  private encoder: TextEncoder;
  private name: string;

  constructor(options?: LoggerOptions) {
    const level = options?.level || "DEBUG";
    this.levelNumber = levelOrder[level];
    this.json = options?.json || false;
    this.encoder = new TextEncoder();
    this.name = options?.name || "default";
  }

  debug(msg: any) {
    this.write(msg, "DEBUG");
  }

  info(msg: any) {
    this.write(msg, "INFO");
  }

  warn(msg: any) {
    this.write(msg, "WARNING");
  }

  error(msg: any) {
    this.write(msg, "ERROR");
  }

  critical(msg: any) {
    this.write(msg, "CRITICAL");
  }

  write(msg: any, level: LoggerLevel) {
    if (levelOrder[level] >= this.levelNumber) {
      if (this.json) {
        const string = JSON.stringify({
          time: new Date().toISOString(),
          name: this.name,
          level,
          msg,
        });
        const encoded = this.encoder.encode(string + "\n");
        Deno.stdout.write(encoded);
      } else {
        console.log(
          `%c${new Date().toISOString()} %c${this.name} %c${level}`,
          "color: green",
          "color: cyan",
          levelColors[level],
          msg,
        );
      }
    }
  }
}
