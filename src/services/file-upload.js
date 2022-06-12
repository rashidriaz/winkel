const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (request, file, callback)=>{
    callback(null, "images");
  },
  filename: (request, file, callback)=>{
    const filePath = new Date().toISOString()  + "_" + file.originalname;
    console.log("filePath: " + filePath);
    callback(null, filePath)
  },
});

const fileFilter = (request, file, callback)=>{
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    callback(null, true);
  }else {
    callback(null,)
  }
}

function fileUpload(){
  return multer({storage: fileStorage, fileFilter: fileFilter}).array("image", 5);
}
module.exports = fileUpload;
