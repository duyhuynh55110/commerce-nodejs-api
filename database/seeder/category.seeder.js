const fs = require("fs")

// model
const mongoose = require("mongoose")
const Category = mongoose.model('Category')

// Base seeder
const BaseSeeder = require('./base.seeder')

// root path
const rootPath = require('app-root-path')

class CategorySeeder extends BaseSeeder {
    constructor() {
        super()
        this.setModel(Category)
        this.setName('CategorySeeder')
    }

    templateData = () => {
        // Read json file
        return JSON.parse(
            fs.readFileSync(rootPath + `/database/_data/categories.json`, 'utf-8')
        );
    } 
}

module.exports = new CategorySeeder()