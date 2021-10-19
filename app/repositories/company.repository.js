const mongoose = require('mongoose');

// models
const Company = mongoose.model('Company');

// base repo for all repo
const BaseRepository = require('./base.repository')

class CompanyRepository extends BaseRepository {
    constructor() {
        super()
        this.setModel(Company)
    }
}

module.exports = new CompanyRepository()