const User = require("../../modals/user");
const Encrypt = require("../encrypt-password");
const TokenGenerator = require("../token-generator");


async function handleException(callback){
  try{
    return callback();
  }catch(error){
    return null;
  }
}
async function createUser(userData){
  const hashedPassword = await Encrypt.encryptPassword(userData.password);
  return new User({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    emailVerified: false,
  });
}
module.exports.findByEmailVerificationToken = token=>{
  return handleException(()=>User.findOne({emailVerificationToken: token}));
}
module.exports.findByResetPasswordToken = token=>{
  return handleException(()=>User.findOne({resetPasswordToken: token,
    resetPasswordTokenExpiration: {$gt: Date.now()}}));
}
module.exports.findByID = id => {
  return handleException(()=>User.findById(id));
}

module.exports.findByEmail = email => {
  return handleException(()=>User.findOne({email: email}));
}
module.exports.loginUser = async (email, password) => {
  const user = await this.findByEmail(email);

  if (!user) return false;
  const passwordMatched = await Encrypt.comparePassword({password: password, hashedPassword: user.password});
  return passwordMatched? user : false;
}

module.exports.signupNewUser = async userData => {
  const user = await createUser(userData);
  return handleException(async()=>{
    const token = await TokenGenerator.generateEmailConfirmationToken();
    user.emailVerificationToken = token;
    await user.save();
    return token;
  })
}

module.exports.forgetPassword = async email=>{
    const user = await this.findByEmail(email);

    if (!user)return null;

      return handleException(async()=>{
        const token = await TokenGenerator.generateResetPasswordToken();
        user.resetPasswordToken = token;
        user.resetPasswordTokenExpiration = Date.now() + 3600000;
        await user.save();
        return token;
      });

}

module.exports.resetUserPassword = async(user, newPassword)=>{
  return handleException(async()=>{
    user.password = await Encrypt.encryptPassword(newPassword);
    await user.save();
    return true;
  })
}
