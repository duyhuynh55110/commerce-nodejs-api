const Resource = require('resources.js');
const { uploadImageUrl } = require('@common');

class UserResource extends Resource {
    toArray() {
        return {
            id: this._id,
            name: this.name,
            email: this.email,
            image: uploadImageUrl(this.image),
        }
    }
}

module.exports = UserResource