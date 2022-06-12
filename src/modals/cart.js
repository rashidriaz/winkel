const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  items: [{
    productID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product"
    },
    quantity: {
      type: Number,
      required: true,
    }
  }]
});

module.exports = mongoose.model("Cart", CartSchema);
