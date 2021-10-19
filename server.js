require('dotenv').config()

// Module alias
require('module-alias/register')
const join = require('path').join;

// Express
const express = require('express')
const fs = require('fs')
const passport = require('passport')

// Mongoose
const mongoose = require('mongoose')

// Logger 
const logger = require('@server/logger')

// Init models
const models_path = join(__dirname, 'app/models') // path to model
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file)
})

const port = process.env.APP_PORT || 3000; // set up port
const app = express(); // use express library

/**
 * Expose
 */
module.exports = app;

// Routes
require('@config/routes')(app, passport)

connect()
mongooseDebug()

// Connection (Mongoose, listen on port)
function connect() {
    mongoose.connection
        .on('error', console.log)
        .on('disconnected', connect)
        .once('open', _listen);

    return mongoose.connect(
        process.env.MONGODB_URL, 
        {
            keepAlive: 1,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    );
}

// Write log all queries in system
function mongooseDebug() {
    mongoose.set('debug', function(coll, method, query, doc, options) {
        let set = {
            coll: coll,
            method: method,
            query: query,
            doc: doc,
            options: options
        }
    
        logger.debug('mongoose SQL', {
            dbQuery: set
        })
    })
}

// listen connect inform
function _listen() {
    if (app.get('env') === 'test') return

    app.listen(port)
    console.log('Express app started on port ' + port)
    console.log('working dir ' + __dirname)
}