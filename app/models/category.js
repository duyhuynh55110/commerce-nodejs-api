const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TranslateSchema = require('./translation')

const CategorySchema = new Schema({
    names: TranslateSchema,
    parent: {type: Schema.Types.ObjectId, ref: 'Category' }
}, { collection : 'categories', versionKey: false });

mongoose.model('Category', CategorySchema)