const companyRepo = require('@repositories/company.repository')
class CompanyService {
    // Get companies and paginate
    paginate = (limit, page) => {
        return companyRepo.paginate({limit, page}).then(result => result[0])
    }
}

module.exports = new CompanyService()