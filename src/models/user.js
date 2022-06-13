const mongoose = require("mongoose");
const Encrypt = require("../services/encrypt-password");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  emailVerified: {
    type: Boolean,
    required: true
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart"
  },
  emailVerificationToken: String,
  resetPasswordToken: String,
  resetPasswordTokenExpiration: Date,
});

  UserSchema.methods.comparePassword = function(password){
    return Encrypt.comparePassword({password: password, hashedPassword: this.password});
}

module.exports = mongoose.model("User", UserSchema);
