const { HTTP_CODE_BAD_REQUEST } = require('@lib/constants')

const BaseError = require('./base.error')

class ValidationHttpError extends BaseError {
    constructor(
        error,
        statusCode = HTTP_CODE_BAD_REQUEST,
    ) {
        // return error message if 'error' not typeof validation 
        if(typeof error !== "string") {
            error = error.message
        }
        
        // Pass value to parent constructor
        super(error, statusCode)
    }
}

module.exports = ValidationHttpError