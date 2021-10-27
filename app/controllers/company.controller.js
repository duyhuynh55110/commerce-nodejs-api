// Service
const companyService = require('@services/company.service')

// Resource
const CompanyResource = require('@resources/company.resource')

// Base Controller
const BaseController = require('./base.controller')

// Redis
const redis = require('@server/redis')

class CompanyController extends BaseController {
    constructor() {
        super()
    }

    // Get companies with paginate
    index = async (req, res) => {
        const { limit, page } = req.query

        let companies = await companyService.paginate(limit, page)
        companies.data = CompanyResource.collection(companies.data)

        // Response
        let response = this.responseCollection(companies)

        // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
        redis.setCache('companies', response)

        res.send(response) 
    }
}

module.exports = new CompanyController()