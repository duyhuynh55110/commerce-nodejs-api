const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TranslateSchema = require('./translation')

const ProductSchema = new Schema({
    price: Number,
    company_id: { type: Schema.Types.ObjectId, ref: 'Company' },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
    names: TranslateSchema,
    descriptions: TranslateSchema,
    image: String,
}, { collection : 'products', versionKey: false })

mongoose.model('Product', ProductSchema)
