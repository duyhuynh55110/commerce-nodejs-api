const Resource = require('resources.js');

const companyResource = require('@resources/company.resource');
const categoryResource = require('@resources/category.resource');

class ProductResource extends Resource {
    toArray() {
        let response = {
            id: this._id,
            price: this.price,
            name: this.name,
        };

        if(this.description) {
            response.description = this.description;
        }

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