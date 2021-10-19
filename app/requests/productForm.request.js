const Joi = require('joi')
const BaseRequest = require("./base.request")

class ProductFormRequest extends BaseRequest {
    constructor() {
        let schemaRules = {
            price: Joi.number().required(),
            category_id: Joi.string().required(),
            company_id: Joi.string().required(),
            name_en: Joi.string().required(),
            name_vn: Joi.string(),
            name_kr: Joi.string(),
            description_en: Joi.string().required(),
            description_vn: Joi.string(),
            description_kr: Joi.string(),
        }

        super(schemaRules)
    }
}

module.exports = new ProductFormRequest()