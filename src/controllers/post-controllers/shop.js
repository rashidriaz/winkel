const ProductService = require("../../services/modal-service/product-service");
const CartService = require("../../services/modal-service/cart-service");
const AddressService = require("../../services/modal-service/address-service");
const OrderService = require("../../services/modal-service/order-service");

module.exports.postDeleteProduct = async (request, response) => {
  const result = await ProductService.deleteProduct(request.body.id, request.session.userID);
  if (result) {
    request.flash("success", "Product Deleted Successfully");
  } else {
    request.flash("error", "Something went wrong please try again");
  }
  response.redirect("/seller/my-products");
}
module.exports.postCartItem = async (request, response) => {
  const product = await ProductService.getProduct({_id: request.body.id});
  if (!product) {
    request.flash("error", "Can not add Item to cart. Try again later");
    return request.redirect("/products/" + request.body.id);
  }
  if (product.quantity < request.body.quantity) {
    request.flash("error", "Limited Stock available");
    return request.redirect("/products/" + request.body.id);
  }
  await CartService.addToCart({cartID: request.user.cart, productID: request.body.id, quantity: request.body.quantity});
  request.flash("success", "Item added to cart successfully")
  return response.redirect("/products/" + request.body.id);
}

module.exports.postDeleteCartItem = async (request, response) => {
  const productID = request.body.id;
  const result = await CartService.deleteCartItem({cartID: request.user.cart, productID: productID});
  if (!result) {
    request.flash("error", "Something went wrong. Can not delete cart items. Please try again");
  }
  return response.redirect("/cart");
}

module.exports.deleteAddress = async (request, response) => {
  const {address} = request;
  if (address.userID.equals(request.session.userID)) {
    await AddressService.deleteAddress(address._id);
  }
  response.redirect("/address-book");
}

module.exports.placeOrder = async(request, response)=>{
  const {address, cart} = request;
  if (cart.items.length ===0){
    return response.redirect("/");
  }
  await OrderService.addNewOrder({
    cart: cart,
    shippingAddress: address,
    userID: request.session.userID
  });

  response.redirect("/orders");
}
