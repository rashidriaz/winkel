const fs = require("fs");
const path = require("path");
module.exports.getNewProductImageUrls = (request, response, next)=>{
  if(request.files){
    request.body.imageUrls = request.files.map(file => file.filename);
  }
  next();
}

module.exports.deleteOldImages = (request, response, next)=>{
  const imageUrls = request.product.imageUrls;
  if (request.files.length > 0){
    imageUrls.forEach(url=>fs.unlinkSync(path.join(__dirname, "../../images",url)));
  }
  next();
}
