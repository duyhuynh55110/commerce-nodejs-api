const Joi = require('joi')

// Validation error
const ValidationHttpError = require('@errors/validationHttp.error')

class BaseRequest {
    constructor(schemaRules, options) {
        // set 'var' for prototype of class
        Object.setPrototypeOf(this, new.target.prototype)
        this.schemaRules = schemaRules
        this.options = options ?? {
            abortEarly: true, // false - include all errors, true - only first error
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        };
    }

    // validate req.body
    validate = () => {
        let schemaRules = this.schemaRules
        let options = this.options

        return (req, res, next) => {
            // create schema object with rules
            const schema = Joi.object(schemaRules)

            // validate request body against schema
            const { error, value } = schema.validate(req.body, options)
            if (error) {
                // on fail return comma separated errors
                next(new ValidationHttpError(error));
            } else {
                // on success replace req.body with validated value and trigger next middleware function
                req.body = value;
                next();
            }
        }
    }

    // validate required image
    validateRequiredImage = (reqName) => {
        return (req, res, next) => {
            // must exist request file have name same with 'reqName'
            if(req.file?.fieldname != reqName) {
                next(new ValidationHttpError(`"${reqName}" is required`))
            }

            next()
        }
    }
}

module.exports = BaseRequest