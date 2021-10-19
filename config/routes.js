'use strict'
const express = require('express')
/*
 * Module dependencies.
 */
const companyController = require('@controllers/company.controller')
const productController = require('@controllers/product.controller')
const categoryController = require('@controllers/category.controller')

/**
 * Error handling
 */
const { errorLog, errorResponse } = require('@middleware/errorHandler.middleware')

// Redis
const redis = require('@server/redis')

// Upload image
const imageUpload = require('@middleware/uploadImage.middleware')

// Request
const productFormRequest = require('../app/requests/productForm.request')

module.exports = function(app, passport) {
    // === Middleware call BEFORE run route (HTTP request)
    // support for parsing application/json
    app.use(express.json())
    
    // support for parsing application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true })) 

    // === Define routes
    // Companies
    app.get('/companies', companyController.index)

    // Products
    app.post('/products/create', [imageUpload.single('image'),  productFormRequest.validateRequiredImage('image'), productFormRequest.validate()], productController.store)
    app.get('/products/:id', productController.show)
    app.get('/products', [redis.cacheMiddleware('products')], productController.index)

    // Categories
    app.get('/categories', categoryController.index)

    // === Middleware call AFTER run route (HTTP response)
    // error handling middleware
    app.use(errorLog)
    app.use(errorResponse)
}
