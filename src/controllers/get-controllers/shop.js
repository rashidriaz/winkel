const ShopPageRenderer = require("../../services/page-renderer-service/shop-page-renderer");

module.exports.getIndex = ShopPageRenderer.renderShopHomePage;

module.exports.getCategoryProductPage = (request, response)=>{
  if (!request.query.category){
    return response.redirect("/");
  }
  ShopPageRenderer.renderCategoryPage(request, response)
};

module.exports.getProductDetailsPage = ShopPageRenderer.renderProductDetailsPage;

module.exports.getCartPage = ShopPageRenderer.renderCartPage;
module.exports.getAddressBookPage = ShopPageRenderer.renderAddressBookPage;
module.exports.getAddAddressPage = ShopPageRenderer.renderAddAddressPage;
module.exports.getEditAddressPage = ShopPageRenderer.renderEditAddressPage;
module.exports.getCheckoutPage = ShopPageRenderer.renderCheckoutPage;
module.exports.getOrdersPage = ShopPageRenderer.renderOrdersPage;

