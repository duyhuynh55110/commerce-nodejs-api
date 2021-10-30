require('dotenv').config()

// model
const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const Category = mongoose.model("Category");
const Company = mongoose.model("Company");

// Base seeder
const BaseSeeder = require("./base.seeder");

// Faker make random data
const faker = require("faker/locale/en");

// Common
const { randomNumber } = require("@common");

class ProductSeeder extends BaseSeeder {
  constructor() {
    super();
    this.setModel(Product);
    this.setName("ProductSeeder");
  }

  templateData = async () => {
    let _this = this;

    // Get random category
    let categoryIds = await Category.find({}, ['_id']).then(categories => {
        return categories.reduce(function (previousValue, currentValue) {
            previousValue.push(currentValue._id);
            return previousValue;
        }, []);
    });
    let companyIds = await Company.find({}, ['_id']).then(companies => {
        return companies.reduce(function (previousValue, currentValue) {
            previousValue.push(currentValue._id);
            return previousValue;
        }, []);
    });

    return [...Array(100)].map(function (element, index) {
      let productName = faker.commerce.productName();
      let productDescription = faker.commerce.productDescription();
      let categoryId = categoryIds[randomNumber(0, categoryIds.length - 1)];
      let companyId = companyIds[randomNumber(0, companyIds.length - 1)];

      let randomProductImage = randomNumber(1, 25);
      let imageName = _this.copyTemplateImage(`/storage/templates/products/${randomProductImage}.png`, '/storage/uploads/');
      
      return {
        price: parseInt(faker.commerce.price()),
        company_id: (index < 10) ? process.env.COMPANY_ID_SEEDER : companyId,
        category_id: categoryId,
        image: imageName,
        descriptions: {
          en: productDescription + " EN",
          vn: productDescription + " VN",
          kr: productDescription + " KR",
        },
        names: {
          en: productName + " EN",
          vn: productName + " VN",
          kr: productName + " KR",
        },
      };
    });
  };
}

module.exports = new ProductSeeder();
