const companyRepo = require('@repositories/company.repository')
class CompanyService {
    // Get companies and paginate
    paginate = (limit, page) => {
        let select = {
            "inform": {
                "tax_code": 1,
                "name": 1,
                "address": 1,
                "phone": 1,
                "email": 1,
                "image": 1,
            }
        }
        return companyRepo.paginate({select, limit, page}).then(result => result[0])
    }

    // Find company inform by id
    findCompanyById = (id) => {
        const select = {
            "inform": "$inform",
            "total_products": {
                $size: "$products",
            }
        };

        return companyRepo.getCompanyById(id, select).then(result => result[0]);
    }
}

module.exports = new CompanyService()