const { HTTP_CODE_INTERNAL_SERVER_ERROR } = require('@lib/constants')
const logger = require('@server/logger')

// Format error response
const _errorFormat = (error) => {
    let httpStatusCode = error.statusCode ?? HTTP_CODE_INTERNAL_SERVER_ERROR // custom error status code else server error status code
    return {
        code: httpStatusCode, 
        message: error.message,
    }
}

// write console log or write log file
const errorLog = (error, req, res, next) => {
    // write log
    logger.error(error.stack, _errorFormat(error))

    next(error) // calling next middleware
}

// format response api error
const errorResponse = (error, req, res, next) => {
    res.header("Content-Type", 'application/json')
    
    // response api format
    let errorFormat = _errorFormat(error)// custom error status code else server error status code
    res.status(errorFormat.code).send(errorFormat)
}
  
module.exports = { errorLog, errorResponse }