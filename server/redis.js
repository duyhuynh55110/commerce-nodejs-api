const { HTTP_CODE_INTERNAL_SERVER_ERROR } = require('@lib/constants')
const redis = require('redis')

class Redis {
    constructor() {
        // create and connect redis client to local instance.
        this.client = redis.createClient({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        })

        // echo redis errors to the console
        this.client.on('error', (err) => {
            console.log("Error " + err)
        })
    }

    // cache for route
    cacheMiddleware = (key) => {
        let client = this.client
        
        return function (req, res, next) {
            try {
                client.get(key, (error, data) => {
                    if(error) {
                        throw error;
                    }
            
                    if(data) {
                        let response = JSON.parse(data)
                        res.send(response)
                    } else {
                        next()
                    }
                })
            } catch (err) {
                res.status(HTTP_CODE_INTERNAL_SERVER_ERROR).send({ error: err.message });
            }
        }
    }

    // Set cache key - value
    setCache = (key, value, lifeTime = process.env.REDIS_LIFETIME) => {
        this.client.setex(key, lifeTime, typeof value === 'object' ? JSON.stringify(value) : value);
    }
}

module.exports = new Redis()