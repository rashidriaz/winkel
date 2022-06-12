
module.exports.renderLoginPage = (request, response)=>{
  return response.render('auth/login', {
    documentTitle: 'Login',
    method: "/login",
    oldInput: {
      email: request.body.email? request.body.email: "",
    }
  });
}

module.exports.renderSignupPage = (request, response)=>{
  response.render('auth/signup', {
    documentTitle: 'Create an Account',
    method: "/signup",
    oldInput: {
      name: request.body.name ? request.body.name : "",
      email: request.body.email ? request.body.email : "",
    }
  });
}

module.exports.renderEmailVerificationSuccessPage = (user, response)=>{
  response.render("auth/email-verified", {
    documentTitle: "Winkel - Email Verification",
    name: user.name? user.name: "",
    email: user.email? user.email: "",
  });
}

module.exports.renderForgetPasswordPage = (request, response)=>{
  response.render("auth/forget-password",{
    documentTitle: "Forget Password",
    method: "/forget-password",
    oldInput: {
      email: request.body.email? request.body.email: "",
    }
  })
}

module.exports.renderNewPasswordPage = (request, response, userData)=>{
  response.render("auth/new-password", {
    documentTitle: "Reset Your password",
    method: "/new-password",
    userID: userData.id,
    token: userData.token,
  })
}
