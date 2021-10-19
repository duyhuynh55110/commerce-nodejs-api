const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    role: Number,
    inform: {
        tax_code: {
            type: String,
            unique: true,
        },
        name: String,
        address: String,
        phone: String,
        email: String,
    },
}, { collection : 'companies', versionKey: false })

mongoose.model('Company', CompanySchema)