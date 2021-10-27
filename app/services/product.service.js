const { resizeImageStorage } = require("@common");

// repository
const productRepo = require("@repositories/product.repository");
const mongoose = require("mongoose");

class ProductService {
  // Get product and paginate
  paginate = (req) => {
    const { limit, page, company_id } = req;

    const select = {
      price: "$price",
      name: "$names.en",
      description: "$descriptions.en",
      image: "$image",
    };

    // Filtering 
    let match = {};

    // Filter company id
    if(company_id != null) {
        match.company = mongoose.Types.ObjectId(company_id);
    }

    // Response products list
    return productRepo
      .paginate({
        select: select,
        match: match,
        limit: limit,
        page: page,
      }).then((result) => result[0]);
  };

  // Show a product by id
  findProductById = (id) => {
    // Response product
    return productRepo.getProductById(id).then((result) => result[0]);
  };

  // Create a product
  createProduct = (req) => {
    const reqBody = req.body;
    const data = {
      price: reqBody.price,
      category: reqBody.category_id,
      company: reqBody.company_id,
      descriptions: {
        en: reqBody.description_en,
        vn: reqBody.description_vn,
        kr: reqBody.description_kr,
      },
      names: {
        en: reqBody.name_en,
        vn: reqBody.name_vn,
        kr: reqBody.name_kr,
      },
    };

    if (req.file) {
      data.image = req.file.path;

      // resize image
      resizeImageStorage(req.file);
    }

    return productRepo.createProduct(data).then((result) => result[0]);
  };
}

module.exports = new ProductService();
