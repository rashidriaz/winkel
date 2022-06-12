const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertyValueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  propertyID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Property"
  }
});

module.exports = mongoose.model("PropertyValue", propertyValueSchema);
