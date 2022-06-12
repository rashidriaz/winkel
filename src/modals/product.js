const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
      type: Number,
    required: true,
  },
  imageUrls: [{
    type: String,
    required: true,
  }],
  category: {
    type: String,
    required: true,
  },
  properties: [{
      type: Schema.Types.ObjectId,
  }],
  userID: {
      type: Schema.Types.ObjectId,
    required: true
  },
  isActive: {
      type: Boolean,
    required: true,
  }
})
module.exports = mongoose.model("Product", productSchema);
