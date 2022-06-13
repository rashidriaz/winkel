const OrderService = require("../services/modal-service/order-service");

module.exports.getOrders = async (request, response, next) => {
  request.orders = await OrderService.getOrders(request.session.userID);
  next();
}
