// Service
const userService = require('@services/user.service')

// Base Controller
const BaseController = require('./base.controller')

class UserController extends BaseController {
    constructor() {
        super()
    }
}

module.exports = new UserController()