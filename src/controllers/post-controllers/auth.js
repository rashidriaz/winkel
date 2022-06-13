const UserService = require("../../services/modal-service/user-service");
const mailService = require("../../services/mail-service");
async function handleException(response, callback) {
  try {
    return callback()
  } catch (error) {
    response.redirect("/server-error")
  }
}

module.exports.postSignup = async (request, response) => {
  if (request.flash("error").length > 0)return response.redirect("/signup");
  return handleException(response, async () => {
    const email = request.body.email;
    const name = request.body.name;
    const password = request.body.password;
    const token = await UserService.signupNewUser({
      name: name,
      email: email,
      password: password
    });
    if (!token) {
      throw new Error("Something went wrong");
    }
    mailService.sendEmailIdVerificationMail({
      emailID: email,
      token: token,
    }, (error, _)=>{
      if (error){
        console.log(error);
      }else{
        request.flash("success", `An email is sent on:  ${email}  for verification purpose.
       Kindly verify your email before you try signing in.`);
      }
      response.redirect("/login");
    });
  });
}


module.exports.postLogin = async (request, response) => {
  const user = await UserService.loginUser(request.body.email, request.body.password);
  if (!user) {
    request.flash("error", "Incorrect email or password");
    return response.redirect("/login");
  }
  request.session.isLoggedIn = true;
  request.session.userID = user._id;
  return request.session.save(_ => {
    return response.redirect("/");
  });
}


module.exports.postForgetPassword = async (request, response) => {
  return handleException(response, async () => {
    const token = await UserService.forgetPassword(request.body.email);
    if (token) {
      await mailService.sendResetPasswordMail({
        emailID: request.body.email,
        token: token,
      }, (error, _)=>{
        if (error){
          request.flash("error", "Something went wrong, please try again");
        }else{
          request.flash("success", "Please check your email to reset your password");

        }
        response.redirect("/login");
      });
    }
  });
}

module.exports.postNewPassword = async (request, response) => {
  const passwordToken = request.body.token;
  const password = request.body.password;
  return handleException(response, async () => {
    const user = await UserService.findByResetPasswordToken(passwordToken);
    if (!user) {
      return response.redirect("/signup");
    }
    const passwordMatched = await user.comparePassword(password);
    if (passwordMatched) {
      request.flash("error", "New password can not be same as old password");
      return response.redirect("/reset-password/" + passwordToken);
    }
    const passwordUpdated = await UserService.resetUserPassword(user, password);
    if (!passwordUpdated) {
      request.flash("error", "Something went wrong please try again");
      return response.redirect("/reset-password/" + passwordToken);;
    }
    response.redirect("/login");
  });
}

module.exports.postLogout = async (request, response) => {
  if (request.session.isLoggedIn) {
    await request.session.destroy(error => {
      if (error) {
        return response.redirect("/server-error");
      }
      return response.redirect("/login");
    });
  }
}
