const Cart = require("../../models/cart");
const mongoose = require("mongoose");

function handleException(callback) {
  try {
    return callback();
  } catch (error) {
    console.log("Error in cart Service");
    console.log(error);
  }
}

module.exports.createCart = async (userID) => {
  const cart = new Cart({user: userID, items: []});
  return handleException(async () => {
    const result = await cart.save();
    if (result) {
      return result._id;
    }
  })
}
module.exports.getCart = async (userID) => {

  return handleException(async () => {
    const result = await Cart.findOne({user: userID}).populate("items.product");
    if (result) {
      return {
        _id: result._id,
        items: result.items.map(item => {
          const { product } = item;
          if (!product.isActive) {
            return this.deleteCartItem({cartID: result._id, productID: product._id});
          }
          return {
            title: product.title,
            _id: product._id,
            price: product.price,
            quantity: product.quantity,
            imageUrl: product.imageUrls[0],
            cartQuantity: item.quantity
          }
        })
      }
    }
    console.log("something went wrong in cart-service/getCart");
  });
}

async function getCart(cartID) {
  if (!cartID) return null;
  return Cart.findById(cartID);
}

module.exports.addToCart = async (data) => {
  return handleException(async () => {
    const cart = await getCart(data.cartID);
    if (!cart) return null;
    data.productID = mongoose.Types.ObjectId(data.productID);
    const itemAlreadyExists = cart.items.find(item => item.product.equals(data.productID))
    if (itemAlreadyExists) {
      return this.updateCartItem(data);
    }
    cart.items.push({
      product: data.productID,
      quantity: data.quantity,
    });
    await cart.save();
    return cart;
  })
}
module.exports.updateCartItem = async (data) => {
  return handleException(async () => {
    const cart = await getCart(data.cartID);
    if (!cart) return null;
    for (let item of cart.items) {
      data.productID = mongoose.Types.ObjectId(data.productID);
      if (item.product.equals(data.productID)) {
        item.quantity = data.quantity;
        break;
      }
    }
    return cart.save();
  });
}

module.exports.deleteCartItem = async (data) => {
  return handleException(async () => {
    return Cart.updateOne({_id: data.cartID}, {$pull: {items: {product: data.productID}} });
  })
}
