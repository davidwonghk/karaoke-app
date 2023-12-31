const { format, createLogger, transports } = require('winston');

// meta param is ensured by splat()
const myFormat = format.printf(({ timestamp, level, message, meta }) => {
  return `${timestamp} [${level}] ${message} ${meta? JSON.stringify(meta) : ''}`;
});

const logger = createLogger({
	level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp(),
    format.splat(),
    myFormat
  ),
  transports: [
    new transports.Console()
  ]
});

module.exports = logger;
