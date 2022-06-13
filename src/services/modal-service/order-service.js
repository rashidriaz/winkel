const Order = require("../../models/order");
const ProductService = require("./product-service");
async function handleException(callback) {
  try {
    return callback();
  } catch (error) {
    console.log("Error in order-service");
    console.log(error);
  }
}

module.exports.addNewOrder = async (data) => {
  const cart = data.cart;
  let totalPrice = 0;
  const items = cart.items.map(item => {
    ProductService.updateQuantity(item._id, item.cartQuantity);
    totalPrice += item.price * item.quantity;
    return {
      product: item._id,
      price: item.price,
      quantity: item.cartQuantity
    };
  });
  const newOrder = new Order({
    user: data.userID,
    items: items,
    totalPrice: totalPrice,
    shippingAddress: data.shippingAddress,
  });
  return handleException(async () => {
    return newOrder.save();
  });
}

function simplifyOrderItems(orderItems) {
  return orderItems.map(item => {
    const {product} = item;
    return {
      productID: product._id,
      title: product.title,
      imageUrl: product.imageUrls[0],
      quantity: item.quantity,
      price: item.price,
    }
  })
}

function simplifyAddressDocumentToString(address) {
  return address.street + ", " + address.apartment + " - " + address.city + ", " + address.state + ", " + address.country + " - " + address.zipCode;
}

module.exports.getOrders = async (userID) => {
  return handleException(async () => {
    let orders = await Order.find({user: userID}).populate("items.product");
    return orders.map(order => {
      const address = order.shippingAddress;
      return {
        _id: order._id,
        totalPrice: order.totalPrice,
        items: simplifyOrderItems(order.items),
        shippingAddress: simplifyAddressDocumentToString(address),
      }
    })
  })
}
