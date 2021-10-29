require("dotenv").config();

// Module alias
require("module-alias/register");
const join = require("path").join;

// Express
const express = require("express");
const fs = require("fs");
const passport = require("passport");

// Mongoose
const mongoose = require("mongoose");

// Logger
const logger = require("@server/logger");

// constant
const {
  STORAGE_UPLOADS_STATIC_URL,
  STORAGE_UPLOADS_PATH,
} = require("@lib/constants");

// Init models
const models_path = join(__dirname, "app/models"); // path to model
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path + "/" + file);
});

const app = express(); // use express library

// Static folder (Need setting to access upload images by URL)
app.use(
  STORAGE_UPLOADS_STATIC_URL,
  express.static(__dirname + "/" + STORAGE_UPLOADS_PATH)
);

/**
 * Expose
 */
module.exports = app;

// Authentication (Must define before router)
app.use(passport.initialize());

// Routes
require("@config/routes")(app, passport);

connect();
mongooseDebug();

// Global variable
global.logger = logger;

// Connection (Mongoose, listen on port)
function connect() {
  mongoose.connection
    .on("error", console.log)
    .on("disconnected", connect)
    .once("open", _listen);

  return mongoose.connect(process.env.MONGODB_URL, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

// Write log all queries in system
function mongooseDebug() {
  mongoose.set("debug", function (coll, method, query, doc, options) {
    let set = {
      coll: coll,
      method: method,
      query: query,
      doc: doc,
      options: options,
    };

    logger.debug("mongoose SQL", {
      dbQuery: set,
    });
  });
}

// listen connect inform
function _listen() {
  if (app.get("env") === "test") return;

  // Http config
  const { port } = require("@server/httpConfig");

  app.listen(port);
  console.log("Express app started on port " + port);
  console.log("working dir " + __dirname);
}