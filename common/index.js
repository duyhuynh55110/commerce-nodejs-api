// constants
const { RESIZE_IMAGE_PRODUCT, STORAGE_UPLOADS_PATH } = require('@lib/constants')
const sharp = require('sharp')
const crypto = require('crypto')

// resize image in storage
const resizeImageStorage = (file, resizeObject = RESIZE_IMAGE_PRODUCT) => {
    let thumbnail = resizeObject.width + 'x' + resizeObject.height + '_'
    let filePath = STORAGE_UPLOADS_PATH + '/' + thumbnail + file.filename

    sharp(file.path).resize(resizeObject).toFile(filePath, function (err) {
        if (err) {
            console.error('sharp>>>', err)
        }
    })
}

// Random number in range
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Check this object is empty or not
const isEmptyObj = (obj) => {
    return Object.keys(obj).length === 0;
}

// Create random hash name
const hashName = () => {
    let hash = crypto.randomBytes(32).toString('hex') // create hash name
    return hash;
} 

module.exports = {
    resizeImageStorage,
    randomNumber,
    isEmptyObj,
    hashName,
}