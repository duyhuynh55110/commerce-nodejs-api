// model
const mongoose = require("mongoose")
const Company = mongoose.model('Company')

// Base seeder
const BaseSeeder = require('./base.seeder')

// Faker make random data
const faker = require('faker/locale/en')

// constant
const { ROLE_SUPPLIER, ROLE_BUYER } = require('@lib/constants')

// Common 
const { randomNumber } = require('@common')

class CompanySeeder extends BaseSeeder {
    constructor() {
        super()
        this.setModel(Company)
        this.setName('CompanySeeder')
    }

    templateData = () => {
        return [...Array(100)].map(function(element, index) {
            // Support random taxCode
            let _randomTaxCode = () => {
                return Math.floor(10000000000 + Math.random() * 90000000000) 
            }
        
            return {
                _id: index == 0 ? '616e2d1e8ceeb00ffd7bf49c' : null,
                role: randomNumber(ROLE_SUPPLIER, ROLE_BUYER),
                inform: {
                    tax_code: _randomTaxCode(), // random number length 11
                    name: faker.company.companyName(),
                    address: faker.address.streetAddress(),
                    phone: faker.phone.phoneNumber('##########'),
                    email: faker.internet.email(),
                }
            }
        })
    }
}

module.exports = new CompanySeeder()