import { inspect } from 'util';
import winston from 'winston';

const Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ level, timestamp, message, stack, ...metadata }) => {
      if (stack) {
        return `[${level.toUpperCase()}] ${timestamp}: ${message}\n${stack}`;
      }

      if (typeof message === 'string') {
        const [objForLog] = metadata[Symbol.for('splat')] ?? [];
        return `[${level.toUpperCase()}] [${timestamp}]  [${message}]   ${
          objForLog ? inspect(objForLog) : ''
        }`;
      }

      return `[${level.toUpperCase()}] [${timestamp}]  ${inspect(message)}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.colorize({
        all: true,
        colors: { info: 'yellowBG', error: 'redBG', warn: 'magentaBG' },
      }),
    }),
  ],
  exitOnError: false,
});

export default Logger;
