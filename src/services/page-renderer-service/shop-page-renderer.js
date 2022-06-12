

module.exports.renderShopHomePage = (request, response)=>{
  return response.render("shop/index", {
    documentTitle: "Shop - Home",
    categories: request.categories,
    oldInput:{
      search:"",
    },
    productsByCategories: request.productsByCategories
  });
}
module.exports.renderCategoryPage = (request, response)=>{
  const category = request.query.category;
  const products = request.products;
  return response.render("shop/category-page", {
    documentTitle: category,
    category: category,
    products: products
  });
}
module.exports.renderProductDetailsPage = (request, response)=>{
  const product = request.product;
  if (!product){
    return response.redirect("/");
  }
  response.render("shop/product-details-page", {
    product: product,
    documentTitle: product.title,
  })
}
