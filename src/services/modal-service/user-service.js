const User = require("../../models/user");
const Encrypt = require("../encrypt-password");
const TokenGenerator = require("../token-generator");
const CartService = require("./cart-service");

async function handleException(callback) {
  try {
    return callback();
  } catch (error) {
    return null;
  }
}

async function createUser(userData) {
  const hashedPassword = await Encrypt.encryptPassword(userData.password);
  return new User({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    emailVerified: false,
  });
}

async function getUser(filter) {
  const user = await User.findOne(filter);
  if (user)
  if (!user.cart) {
    user.cart = await CartService.createCart(user._id);
    await user.save();
  }
  return user;
}

module.exports.findByEmailVerificationToken = token => {
  return handleException(() => getUser({emailVerificationToken: token}));
}
module.exports.findByResetPasswordToken = token => {
  return handleException(() => getUser({
    resetPasswordToken: token,
    resetPasswordTokenExpiration: {$gt: Date.now()}
  }));
}
module.exports.findByID = id => {
  return handleException(() => getUser({_id: id}));
}

module.exports.findByEmail = email => {
  return handleException(() => getUser({email: email}));
}
module.exports.loginUser = async (email, password) => {
  const user = await this.findByEmail(email);

  if (!user) return false;
  const passwordMatched = await Encrypt.comparePassword({password: password, hashedPassword: user.password});
  return passwordMatched ? user : false;
}

module.exports.signupNewUser = async userData => {
  const user = await createUser(userData);
  return handleException(async () => {
    const token = await TokenGenerator.generateEmailConfirmationToken();
    user.emailVerificationToken = token;
    const result = await user.save();
    user.cart = await CartService.createCart(result._id);
    result.save();
    return token;
  })
}

module.exports.forgetPassword = async email => {
  const user = await this.findByEmail(email);

  if (!user) return null;

  return handleException(async () => {
    const token = await TokenGenerator.generateResetPasswordToken();
    user.resetPasswordToken = token;
    user.resetPasswordTokenExpiration = Date.now() + 3600000;
    await user.save();
    return token;
  });

}

module.exports.resetUserPassword = async (user, newPassword) => {
  return handleException(async () => {
    user.password = await Encrypt.encryptPassword(newPassword);
    await user.save();
    return true;
  })
}
