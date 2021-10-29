const fs = require("fs")

// model
const mongoose = require("mongoose")
const User = mongoose.model('User')

// Base seeder
const BaseSeeder = require('./base.seeder')

// Faker make random data
const faker = require('faker/locale/en')

// bcrypt 
const bcrypt = require('bcrypt')

// Common
const { randomNumber } = require("@common");

class UserSeeder extends BaseSeeder {
    constructor() {
        super()
        this.setModel(User)
        this.setName('UserSeeder')
    }

    templateData = () => {
        let _this = this;

        return [...Array(23)].map(function(element, index) {
            let randomProductImage = randomNumber(1, 22);
            let imageName = _this.copyTemplateImage(
                `/storage/templates/users/${randomProductImage}.png`, 
                '/storage/uploads/'
            );
            let password = bcrypt.hashSync('12345678', 10);
            
            return {
                _id: null,
                name: index == 0 ? 'Test User' : faker.name.findName(),
                email: index == 0 ? 'user.local@gmail.com' : faker.internet.email(),
                password: password,
                image: imageName,
            }
        })
    } 
}

module.exports = new UserSeeder()