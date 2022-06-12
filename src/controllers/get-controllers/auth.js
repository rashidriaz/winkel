const UserService = require("../../services/modal-service/user-service");
const AuthPageRenderer = require("../../services/page-renderer-service/auth-page-renderer");


module.exports.getLogin = (request, response)=>{
  AuthPageRenderer.renderLoginPage(request, response)
}

module.exports.getSignup = (request, response)=>{
  AuthPageRenderer.renderSignupPage(request, response);
}

module.exports.getEmailVerificationPage = async(request, response)=>{
  const token = request.params.token;
  const user = await UserService.findByEmailVerificationToken(token);
  if(!user){
    return response.redirect("/");
  }
  user.emailVerified = true;
  await user.save();
  AuthPageRenderer.renderEmailVerificationSuccessPage(user, response)
}
module.exports.getForgetPassword = (request, response)=>{
  AuthPageRenderer.renderForgetPasswordPage(request, response);
}

module.exports.getNewPassword = async(request, response)=>{
  const token = request.params.token;
  const user = await UserService.findByResetPasswordToken(token);
  if (!user){
    return response.redirect("/");
  }
  const userData = {id: user._id, token: token};
AuthPageRenderer.renderNewPasswordPage( request, response, userData,);
}
