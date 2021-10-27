const Resource = require('resources.js');

const companyResource = require('@resources/company.resource');
const categoryResource = require('@resources/category.resource');
const { uploadImageUrl } = require('@common');

class ProductResource extends Resource {
    toArray() {
        let response = {
            id: this._id,
            price: this.price,
            name: this.name,
            description: this.description,
            image: uploadImageUrl(this.image),
        };

        if(this.company) {
            response.company = new companyResource(this.company).exec();
        }

        if(this.category) {
            response.category = new categoryResource(this.category).exec();
        }

        return response;
    }
}

module.exports = ProductResource