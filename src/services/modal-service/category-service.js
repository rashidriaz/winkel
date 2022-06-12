const Category = require("../../modals/category");

async function handleException(callback){
  try{
    return callback();
  }catch(error){
      console.log(error);
  }
}

module.exports.postCategory = async(title)=>{
  title = title.toLowerCase();
  return handleException(async()=>{
    const category = await Category.findOne({title: title});
    if (!category){
      const newCategory = new Category({title: title});
      return newCategory.save();
    }
    return null;
  });
}

module.exports.getCategories = async()=>{
  return handleException(async()=>{

    let categories = await Category.find().sort({title: 1});
    categories = categories.map(category=>category.title);
    return categories;
  });
}

module.exports.getCategory = async(title)=>{
  return handleException(async()=>{
    return Category.find({title: title});
  });
}
