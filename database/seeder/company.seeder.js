require('dotenv').config()

// model
const mongoose = require("mongoose")
const Company = mongoose.model('Company')

// Base seeder
const BaseSeeder = require('./base.seeder')

// Faker make random data
const faker = require('faker/locale/en')

// Common 
const { randomNumber } = require('@common')
class CompanySeeder extends BaseSeeder {
    constructor() {
        super()
        this.setModel(Company)
        this.setName('CompanySeeder')
    }

    templateData = () => {
        let _this = this;

        return [...Array(100)].map(function(element, index) {
            // Support random taxCode
            let _randomTaxCode = () => {
                return Math.floor(10000000000 + Math.random() * 90000000000) 
            }
            let randomProductImage = randomNumber(1, 6);
            let imageName = _this.copyTemplateImage(
                `/storage/templates/companies/${randomProductImage}.png`, 
                '/storage/uploads/'
            );

            return {
                _id: index == 0 ? process.env.COMPANY_ID_SEEDER : null,
                inform: {
                    tax_code: _randomTaxCode(), // random number length 11
                    name: faker.company.companyName(),
                    address: faker.address.streetAddress(),
                    phone: faker.phone.phoneNumber('##########'),
                    email: faker.internet.email(),
                    image: imageName,
                }
            }
        })
    }
}

module.exports = new CompanySeeder()