const mongoose = require('mongoose')
const Schema = mongoose.Schema

// constants
const { LANGUAGE_EN, LANGUAGE_VN, LANGUAGE_KR } = require('@lib/constants')

module.exports = {
    [LANGUAGE_EN]: String,
    [LANGUAGE_VN]: String,
    [LANGUAGE_KR]: String,
}