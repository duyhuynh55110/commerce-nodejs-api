const { HTTP_CODE_NOT_FOUND } = require('@lib/constants')

const BaseError = require('./base.error')

class DataNotFoundHttpError extends BaseError {
    constructor(
        description = 'not found.',
        statusCode = HTTP_CODE_NOT_FOUND,
    ) {
        // Pass value to parent constructor
        super(description, statusCode)
    }
}

module.exports = DataNotFoundHttpError