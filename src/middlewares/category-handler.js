const CategoryService = require("../services/modal-service/category-service");


module.exports.getCategories = async(request, response, next)=>{
  request.categories = await CategoryService.getCategories();
  next();
}

module.exports.postCategory = async(request, response, next)=>{
  const category = request.body.category;
  try {
    await CategoryService.postCategory(category);
    next();
  }catch(error){
    console.log(error);
  }
}
