const ProductService = require("../services/modal-service/product-service");
const {request} = require("express");


module.exports.fetchProductsByCategories = async (request, response, next) => {
  const categories = request.categories;
  let productsByCategories = {};
  for (let category of categories) {
    productsByCategories[category] = await ProductService.getProductOverviewDataByCategory(category, request.session.userID);
  }
  request.productsByCategories = productsByCategories;
  next();
}

module.exports.fetchProducts = async (request, response, next) => {
  const category = request.query.category;
  if (category) {
    request.products = await ProductService.getProductOverviewDataByCategory(category, request.session.userID);
  }
  next();
}
module.exports.fetchProduct = async (request, response, next) => {
  const productID = request.params.id;
  request.product = await ProductService.getProduct({_id: productID}, true);
  return next();
}

module.exports.fetchUserProducts = async (request, response, next) => {
  request.products = await ProductService.getAllProductsForLoggedInUser(request.session.userID, "_id title price imageUrls");
  next();
}
module.exports.fetchEditProduct = async (request, response, next) => {
  const isGetRequest = request.method === "GET";
  const productID = isGetRequest? request.params.id : request.body.id;
  const userID = request.session.userID;
  const product = await ProductService.getProduct({_id: productID, userID: userID}, isGetRequest);
  if (product) {
    request.product = product;
    return next();
  } else {
    return response.redirect("error/404");
  }
}
