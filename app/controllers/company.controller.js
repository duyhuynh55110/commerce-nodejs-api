// Service
const companyService = require("@services/company.service");

// Resource
const CompanyResource = require("@resources/company.resource");

// Data not found error
const DataNotFoundHttpError = require('@errors/dataNotFoundHttp.error')

// Base Controller
const BaseController = require("./base.controller");

// Redis
const redis = require("@server/redis");

class CompanyController extends BaseController {
  constructor() {
    super();
  }

  // Get companies with paginate
  index = async (req, res) => {
    const { limit, page } = req.query;

    let companies = await companyService.paginate(limit, page);
    companies.data = CompanyResource.collection(companies.data);

    // Response
    let response = this.responseCollection(companies);

    // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
    redis.setCache("companies", response);

    res.send(response);
  };

  // Show a company inform
  show = async (req, res, next) => {
    try {
      let company = await companyService.findCompanyById(req.params.id);

      // error if not found
      if (!company) {
        throw new DataNotFoundHttpError();
      }

      let companyResource = new CompanyResource(company).exec();
      let response = this.responseSingle(companyResource);
      res.send(response);
    } catch (error) {
      // call to error handling middleware
      next(error);
    }
  };
}

module.exports = new CompanyController();
