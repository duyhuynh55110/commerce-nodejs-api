// Root path
const rootPath = require('app-root-path');

//include the fs, path modules
var fs = require('fs-extra');
const { hashName } = require("@common");


class BaseSeeder {
  // Define what model for this seeder
  setModel(model) {
    this.model = model;
  }

  // Define name for this seeder
  setName(name) {
    this.name = name;
  }

  // Import into collection
  importData = async (data) => {
    try {
      console.log(`Insert ${this.name} data...`);
      await this.model.create(data);
      console.log(`Inserted ${this.name}.`);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete data
  deleteData = async () => {
    try {
      console.log(`Data ${this.name} truncating...`);
      await this.model.deleteMany();
      console.log(`Truncated ${this.name}.`);
    } catch (error) {
      console.log(error);
    }
  };

  // Copy file and return copy file name
  copyTemplateImage = (file, dir2) => {
    //gets file name and adds it to dir2
    var fileName = hashName() + ".png";

    let srcFile = rootPath + file;
    let destFile = rootPath + dir2 + fileName;
    fs.copySync(srcFile, destFile);

    return fileName;
  };
}

module.exports = BaseSeeder;
