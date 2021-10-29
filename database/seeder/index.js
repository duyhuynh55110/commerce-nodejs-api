require('dotenv').config()

// Module alias
require('module-alias/register')

const fs = require("fs")
const mongoose = require("mongoose")
const rootPath = require('app-root-path')

// Init models
const models_path = rootPath + '/app/models' // path to model
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file)
})

// Seeders
const CategorySeeder = require('./category.seeder')
const CompanySeeder = require('./company.seeder')
const ProductSeeder = require('./product.seeder')
const UserSeeder = require('./user.seeder')

// Connect to DB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

// Import into DB
const importData = async () => {
    try {
        await CategorySeeder.importData(CategorySeeder.templateData())
        await CompanySeeder.importData(CompanySeeder.templateData())
        await ProductSeeder.importData(await ProductSeeder.templateData())
        await UserSeeder.importData(UserSeeder.templateData())
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

// Delete data
const deleteData = async () => {
    try {
        await CategorySeeder.deleteData()
        await CompanySeeder.deleteData()
        await ProductSeeder.deleteData()
        await UserSeeder.deleteData()
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

// Process command from user
if (process.argv[2] === "-i") {
    importData()
} else if (process.argv[2] === "-d") {
    deleteData()
}