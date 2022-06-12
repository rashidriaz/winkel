const ProductService = require("../../services/modal-service/product-service");
const SellerScreenRenderer = require("../../services/page-renderer-service/seller-page-renderer");

module.exports.postAddProduct = async (request, response) => {
  const body = request.body;
  try {
    await ProductService.postProduct({
      title: body.title,
      price: body.price,
      quantity: body.quantity,
      imageUrls: body.imageUrls,
      userID: request.session.userID,
      description: body.description,
      isActive: true,
      category: body.category,
      properties: request.properties,
    });
    response.redirect("/");
  } catch (error) {
    console.log(error.message);
    request.flash("error", error.message);
    SellerScreenRenderer.renderAddNewProductPage(request, response);
  }
}

module.exports.postEditProduct = async (request, response) => {
  const body = request.body;
  const product = request.product;
  try {
    product.title = body.title;
    product.price = body.price;
    product.quantity = body.quantity;
    product.imageUrls = body.imageUrls?.length > 0? body.imageUrls : product.imageUrls;
    product.userID = request.session.userID;
    product.description = body.description;
    product.isActive = true;
    product.category = body.category;
    product.properties = request.properties;
    await product.save();
    response.redirect("/seller/my-products");
  } catch (error) {
    console.log(error.message);
    request.flash("error", error.message);
    SellerScreenRenderer.renderMyProductsPage(request, response);
  }
}
