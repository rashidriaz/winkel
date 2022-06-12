const SellerPageRenderer = require("../../services/page-renderer-service/seller-page-renderer");

module.exports.getAddProduct = SellerPageRenderer.renderAddNewProductPage;

module.exports.getMyProducts = SellerPageRenderer.renderMyProductsPage;
module.exports.getEditProduct = SellerPageRenderer.renderEditProductPage;

