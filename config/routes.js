"use strict";
const express = require("express");

/** 
 * Controllers
 */
const companyController = require("@controllers/company.controller");
const productController = require("@controllers/product.controller");
const categoryController = require("@controllers/category.controller");
const authController =  require("@controllers/auth.controller");

/**
 * Error handling
 */
const {
  errorLog,
  errorResponse,
} = require("@middleware/errorHandler.middleware");

// Redis
const redis = require("@server/redis");

// Middleware
const imageUpload = require("@middleware/uploadImage.middleware"); // upload image
const auth = require("@middleware/auth.middleware"); // authentication

// Request
const productFormRequest = require("@requests/productForm.request");
const loginFormRequest = require("@requests/loginForm.request");

// CORS
const cors = require("cors");

module.exports = function (app, passport) {
  // === Middleware call BEFORE run route (HTTP request)
  // Enable CORS
  app.use(cors());

  // support for parsing application/json
  app.use(express.json());

  // support for parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  // === Define routes
  // Companies
  app.get("/companies/:id", companyController.show);
  app.get(
    "/companies",
    companyController.index
  );

  // Products
  app.post(
    "/products/create",
    [
      imageUpload.single("image"),
      productFormRequest.validateRequiredImage("image"),
      productFormRequest.validate(),
    ],
    productController.store
  );
  app.get("/products/:id", productController.show);
  app.get("/products", productController.index);

  // Categories
  app.get(
    "/categories",
    [redis.cacheMiddleware("categories")],
    categoryController.index
  );

  // Authentication
  app.get("/profile", auth, authController.profile);
  app.post("/login", loginFormRequest.validate(), authController.login);
  app.post("/logout", auth, authController.logout);
  app.post("/logout-all", auth, authController.logoutAll);

  // === Middleware call AFTER run route (HTTP response)
  // error handling middleware
  app.use(errorLog);
  app.use(errorResponse);
};
