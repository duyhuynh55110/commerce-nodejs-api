const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TranslateSchema = require('./translation')

const ProductSchema = new Schema({
    price: Number,
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    names: TranslateSchema,
    descriptions: TranslateSchema,
    image: String,
}, { collection : 'products', versionKey: false })

mongoose.model('Product', ProductSchema)
