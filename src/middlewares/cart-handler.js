const CartService = require("../services/modal-service/cart-service");


module.exports.getCartItems = async (request, response, next) => {
  const cart = await CartService.getCart(request.session.userID);
  if (cart) {
    request.cart = cart;
    return next();
  } else {
    response.redirect("/server-error");
  }
}
module.exports.checkEmptyCart = (request, response, next) => {
  const {cart} = request;
  if (cart.items.length === 0) {
    return response.redirect("/");
  }
  next();
}


