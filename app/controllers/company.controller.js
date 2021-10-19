// Service
const companyService = require('@services/company.service')

// Resource
const CompanyResource = require('@resources/company.resource')

// Base Controller
const BaseController = require('./base.controller')

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
        res.send(response) 
    }
}

module.exports = new CompanyController()