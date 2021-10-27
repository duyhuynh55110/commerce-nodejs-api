const Resource = require('resources.js');
const { uploadImageUrl } = require('@common');

class CompanyResource extends Resource {
    toArray() {
        return {
            id: this._id,
            role: this.role,
            tax_code: this.inform.tax_code,
            name: this.inform.name,
            address: this.inform.address,
            phone: this.inform.phone,
            email: this.inform.email,
            image: uploadImageUrl(this.inform.image),
        }
    }
}

module.exports = CompanyResource