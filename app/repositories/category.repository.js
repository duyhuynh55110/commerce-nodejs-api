const mongoose = require('mongoose');

// models
const Category = mongoose.model('Category');

// base repo for all repo
const BaseRepository = require('./base.repository')

class CategoryRepository extends BaseRepository {
    constructor() {
        super()
        this.setModel(Category)
    }
}

module.exports = new CategoryRepository()