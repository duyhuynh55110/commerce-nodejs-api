class BaseError extends Error {
    constructor(description, statusCode) {
        super(description)

        // set 'var' for prototype of class
        Object.setPrototypeOf(this, new.target.prototype)
        this.statusCode = statusCode 
        this.description = description 
        Error.captureStackTrace(this)
    }
}

module.exports = BaseError