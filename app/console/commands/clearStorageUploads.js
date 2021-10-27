const fs = require('fs');
const path = require('path');
const rootPath = require('app-root-path');
const storagePath = rootPath + '/storage/uploads/';

fs.readdir(storagePath, (err, files) => {
    if (err) {
        console.log(err);
    }

    files.forEach(file => {
        const fileDir = path.join(storagePath, file);

        if (file !== '.gitignore') {
            fs.unlinkSync(fileDir);
        }
    });
});