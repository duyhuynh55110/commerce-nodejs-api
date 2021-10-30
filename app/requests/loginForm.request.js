const Joi = require('joi')
const BaseRequest = require("./base.request")

class LoginFormRequest extends BaseRequest {
    constructor() {
        let schemaRules = {
            email: Joi.string().required().email(),
            password: Joi.string().required().min(6),
        }

        super(schemaRules)
    }
}

module.exports = new LoginFormRequest()