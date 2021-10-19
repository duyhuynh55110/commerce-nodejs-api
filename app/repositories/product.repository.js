const mongoose = require('mongoose')

// model
const Product = mongoose.model('Product')

// base repo for all repo
const BaseRepository = require('./base.repository')

class ProductRepository extends BaseRepository {
    constructor() {
        super()
        this.setModel(Product)
    }

    // Show a product by id
    getProductById(id) {
        const select = {
            'price': '$price',
            'name': '$names.en',
            'description': '$descriptions.en',
            'company': '$company',
            'category': '$category'
        }

        return this.model.aggregate([
            {
                $match: {
                    '_id': mongoose.Types.ObjectId(id)
                }
            },
            {
                $project: select
            },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'company',
                    foreignField: '_id',
                    as: 'company',
                    pipeline: [
                        {
                            $project: {
                                role: 1,
                                inform: 1
                            }
                        }
                    ],
                }
            },
            {
                $unwind: '$company'
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                    pipeline: [
                        {
                            $addFields: {
                                'name': '$names.en'
                            }
                        },
                        {
                            $project: {
                                name: 1,
                            }
                        }
                    ],
                }
            },
            {
                $unwind: '$category'
            }
        ])
    }

    // Create a product
    async createProduct(product) {
        let productId = null;
        
        // Create doc and wait for return id
        await this.model.create(product).then(product => {
            productId = product.id;
        })

        // Response product inform
        return this.getProductById(productId)
    }
}

module.exports = new ProductRepository()