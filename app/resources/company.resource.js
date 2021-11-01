const Resource = require('resources.js');
const { uploadImageUrl } = require('@common');

class CompanyResource extends Resource {
    toArray() {
        return {
            id: this._id,
            name: this.inform.name,
            tax_code: this.inform?.tax_code,
            address: this.inform?.address,
            phone: this.inform?.phone,
            email: this.inform?.email,
            image: uploadImageUrl(this.inform.image),
            description: this.inform?.description,
            total_products: this?.total_products,
        }
    }
}

module.exports = CompanyResource