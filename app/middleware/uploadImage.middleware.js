// constants
const { STORAGE_UPLOADS_PATH, MAX_FILE_SIZE_UPLOAD } = require('@lib/constants')

// Validation error
const ValidationHttpError = require('@errors/validationHttp.error')

const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

// Create random hash name
const _hashName = () => {
  let hash = crypto.randomBytes(32).toString('hex') // create hash name
  return hash;
}

// Config storage for upload files
const storage = multer.diskStorage({
  // Destination to store image     
  destination: STORAGE_UPLOADS_PATH,
  filename: (req, file, cb) => {
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
    let fileName = _hashName() + path.extname(file.originalname)

    cb(null, fileName)
  }
})

const imageUpload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_FILE_SIZE_UPLOAD
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new ValidationHttpError(`"${file.fieldname}" must be .png or .jpg`))
    }

    cb(undefined, true)
  }
})

module.exports = imageUpload