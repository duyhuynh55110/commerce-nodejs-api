// constants
const {
  RESIZE_IMAGE_PRODUCT,
  STORAGE_UPLOADS_STATIC_URL,
} = require("@lib/constants");
const sharp = require("sharp");
const crypto = require("crypto");
const fs = require("fs-extra");

// resize image in storage
const resizeImageStorage = async (
  file,
  resizeObject = RESIZE_IMAGE_PRODUCT
) => {
  await sharp(file.path)
    .resize(resizeObject)
    .toBuffer()
    .then((data) => {
      fs.writeFileSync(file.path, data);
    });
};

// Random number in range
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Check this object is empty or not
const isEmptyObj = (obj) => {
  return Object.keys(obj).length === 0;
};

// Create random hash name
const hashName = () => {
  let hash = crypto.randomBytes(32).toString("hex"); // create hash name
  return hash;
};

// Get path to uploads images
const uploadImageUrl = (fileName) => {
  return 'http://localhost:3000' + STORAGE_UPLOADS_STATIC_URL + "/" + fileName;
};

module.exports = {
  resizeImageStorage,
  randomNumber,
  isEmptyObj,
  hashName,
  uploadImageUrl,
};
