const Resource = require('resources.js');

class CategoryResource extends Resource {
    toArray() {
        return {
            id: this._id,
            name: this.name,
        }
    }
}

module.exports = CategoryResource