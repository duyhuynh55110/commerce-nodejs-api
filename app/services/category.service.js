const categoryRepo = require('@repositories/category.repository')
class CategoryService {
    // Get categories and paginate
    paginate = (limit, page) => {
        const select = {
            'name': "$names.en"
        };
        return categoryRepo.paginate(select, limit, page).then(result => result[0]);
    }
}

module.exports = new CategoryService()