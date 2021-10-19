const companyRepo = require('@repositories/company.repository')
class CompanyService {
    // Get companies and paginate
    paginate = (limit, page) => {
        const select = null;
        return companyRepo.paginate(select, limit, page).then(result => result[0])
    }
}

module.exports = new CompanyService()