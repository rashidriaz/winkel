const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
  items: [{
    product: {
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
