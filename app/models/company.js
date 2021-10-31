const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    inform: {
        tax_code: {
            type: String,
            unique: true,
        },
        name: String,
        address: String,
        phone: String,
        email: String,
        image: String,
        description: {
            type: String,
            max: 512,
        },
    },
}, { collection : 'companies', versionKey: false })

mongoose.model('Company', CompanySchema)