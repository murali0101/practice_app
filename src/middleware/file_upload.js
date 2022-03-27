const multer = require("multer");
const path = require("path");
const req = require("express/lib/request");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../my_files"));
  },
  filename: function (req, file, cb) {
    const uniqueprefix = Date.now();
    cb(null, uniqueprefix + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }else{
        cb(new Error("Incorrect mime type"),  false);
    }

  
}

let opt = {
  storage,
  fileFilter,
};

const fileUpload = multer(opt);
module.exports = fileUpload;
