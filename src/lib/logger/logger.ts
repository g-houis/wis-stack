import winston, { transports, format } from 'winston';

const options: winston.LoggerOptions = {
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'MM-DD-YYYY HH:mm:ss' }),
        format.colorize({ all: true }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`,
        ),
      ),
    }),
  ],
};

const logger = winston.createLogger(options);

export default logger;