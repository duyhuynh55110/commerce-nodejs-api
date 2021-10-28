// Service
const productService = require('@services/product.service')

// Resource
const ProductResource = require('@resources/product.resource')

// Data not found error
const DataNotFoundHttpError = require('@errors/dataNotFoundHttp.error')

// Base Controller
const BaseController = require('./base.controller')

class ProductController extends BaseController {
    constructor() {
        super()
    }
    
    // Get products with paginate
    index = async (req, res) => {
        let products = await productService.paginate(req.query)
        products.data = ProductResource.collection(products.data)
        
        // Response
        let response = this.responseCollection(products)
        res.send(response)
    }

    // Show a product inform
    show = async (req, res, next) => {
        try {
            let product = await productService.findProductById(req.params.id)

            // error if not found
            if (!product) {
                throw new DataNotFoundHttpError()
            }

            let productResource = new ProductResource(product).exec();
            let response = this.responseSingle(productResource)
            res.send(response)
        } catch (error) {
            // call to error handling middleware 
            next(error)
        }
    }

    // Create a product
    store = async (req, res, next) => {
        try {
            let product = await productService.createProduct(req)
            
            let productResource = new ProductResource(product).exec()
            let response = this.responseSingle(productResource)
            res.send(response)
        } catch (error) {
            // call to error handling middleware 
            next(error)
        }
    }
}

module.exports = new ProductController()