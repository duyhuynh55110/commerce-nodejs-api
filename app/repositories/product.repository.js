const mongoose = require("mongoose");

// model
const Product = mongoose.model("Product");

// base repo for all repo
const BaseRepository = require("./base.repository");

// Error
const DataNotFoundHttpError = require('@errors/dataNotFoundHttp.error');
class ProductRepository extends BaseRepository {
  constructor() {
    super();
    this.setModel(Product);
  }

  // Show a product by id
  getProductById(id) {
    const select = {
      price: "$price",
      name: "$names.en",
      image: "$image",
      description: "$descriptions.en",
      company: "$company",
      category: "$category",
    };
    try {
      id = mongoose.Types.ObjectId(id);
    } catch (e) {
      throw new DataNotFoundHttpError();
    }

    return this.model.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "company_id",
          foreignField: "_id",
          as: "company",
          pipeline: [
            {
              $project: {
                role: 1,
                inform: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$company",
      },
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category",
          pipeline: [
            {
              $addFields: {
                name: "$names.en",
              },
            },
            {
              $project: {
                name: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: select,
      },
    ]);
  }

  // Create a product
  async createProduct(product) {
    let productId = null;

    // Create doc and wait for return id
    await this.model.create(product).then((product) => {
      productId = product.id;
    });

    // Response product inform
    return this.getProductById(productId);
  }
}

module.exports = new ProductRepository();
