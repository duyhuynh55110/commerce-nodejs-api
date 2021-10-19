// constants
const { RESIZE_IMAGE_320x320, STORAGE_UPLOADS_PATH } = require('@lib/constants')
const sharp = require('sharp')

// resize image in storage
const resizeImageStorage = (file, resizeObject = RESIZE_IMAGE_320x320) => {
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

module.exports = {
    resizeImageStorage,
    randomNumber,
}