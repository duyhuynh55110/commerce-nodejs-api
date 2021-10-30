const { HTTP_CODE_UNAUTHORIZED } = require('@lib/constants')

const BaseError = require('./base.error')

class AuthError extends BaseError {
    constructor(
        description = 'authentication failed.',
        statusCode = HTTP_CODE_UNAUTHORIZED,
    ) {
        // Pass value to parent constructor
        super(description, statusCode)
    }
}

module.exports = AuthError