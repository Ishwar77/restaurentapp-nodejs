const multer = require('multer');

const fs = require('fs');

const MIMETYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpeg': 'jpeg'
};

const storage=multer.diskStorage({
  destination : (req,file,cb) => {
    console.log('jello');
    const isValid = MIMETYPE[file.mimetype];
    let error = new Error("Invalid MimeType");
    if(isValid) {
      error = null;
    }
    //FOR LOCAL TEST
    //cb(error,"serverbackend/uploads");

    //FOR SERVER TEST
    cb(error,"uploads");
  },
  filename : (req,file,cb) => {
    console.log('file hello');
    const filename = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIMETYPE[file.mimetype];
    cb(null,filename+Date.now()+'.'+ext);
  },
  onError : function(err, next) {
    console.log('My daaa---------------------------------------------------------');
    next(err);
  }
});

module.exports = multer({storage:storage}).single('inputItemImage');
