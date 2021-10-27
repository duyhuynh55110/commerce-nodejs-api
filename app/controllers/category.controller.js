// Service
const categoryService = require('@services/category.service')

// Resource
const CategoryResource = require('@resources/category.resource')

// Base Controller
const BaseController = require('./base.controller')

// Redis
const redis = require('@server/redis')

class CategoryController extends BaseController {
    constructor() {
        super()
    }

    // Get categories with paginate
    index = async (req, res) => {
        const { limit, page } = req.query

        let categories = await categoryService.paginate(limit, page)
        categories.data = CategoryResource.collection(categories.data)

        // Response
        let response = this.responseCollection(categories)

        // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
        redis.setCache('categories', response)

        res.send(response) 
    }
}

module.exports = new CategoryController()