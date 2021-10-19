const { STORAGE_LOG_PATH } = require('@lib/constants')
const winston = require('winston');

// get current time UTC timezone
const dateFormat = () => {
  return new Date(Date.now()).toUTCString()
}

// create format for new log
const logFormat = (info) => {
  let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${info.message} | `
  message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message
  message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
  return message
}

class Logger {
  constructor() {
    this.logger = winston.createLogger({
      level: 'debug',
      format: winston.format.printf(logFormat),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({ filename: STORAGE_LOG_PATH }),
      ],
    });
  }

  // log message info level 
  info = async (message, obj) => {
    let callback = obj ? { 
      obj 
    } : {}

    this.logger.log('info', message, callback)
  }

  // log message debug level 
  debug = async (message, obj) => {
    let callback = obj ? { 
      obj 
    } : {}

    this.logger.log('debug', message, callback)
  }

  // log message error level 
  error = async (message, obj) => {
    let callback = obj ? { 
      obj 
    } : {}

    this.logger.log('error', message, callback)
  }
}

module.exports = new Logger()