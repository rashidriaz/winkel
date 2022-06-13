const UserService = require("../services/modal-service/user-service");
const ProductService = require("../services/modal-service/product-service");

function isAuth(session) {
  return session.isLoggedIn;
}

module.exports.isAuthenticated = (request, response, next) => {
  if (isAuth(request.session)) {
    next();
  } else {
    response.redirect("/login");
  }
}

module.exports.isNotAuthenticated = (request, response, next) => {
  if (!isAuth(request.session)) {
    next();
  } else {
    response.redirect("/");
  }
}

module.exports.isEmailVerified = async (request, response, next) => {
  const user = await UserService.findByEmail(request.body.email);

  if (!user) {
    request.flash("error", "Incorrect Email or Password");
    return response.redirect("/login")
  }
  if (user.emailVerified) {
    return next();
  }
  request.flash("error", "Email address not verified. Please verify your email address before you try to login");
  response.redirect("/login");

}


module.exports.emailAlreadyExists = async (request, response, next) => {
  const user = await UserService.findByEmail(request.body.email);
  if (user) {
    request.flash("error", "An account with this email address already exists");
    return response.redirect("/signup");
  }
  next();
}

module.exports.checkConfirmPassword = (request, response, next) => {
  const password = request.body.password;
  const confirmPassword = request.body.confirmPassword;
  if (password !== confirmPassword) {
    request.flash("error", "Passwords do not match");
    if (request.body.token) {
      return response.redirect("/reset-password/" + request.body.token);
    }
    return response.redirect("/signup");
  }
  next();
}

module.exports.checkPasswordLength = (request, response, next) => {
  const password = request.body.password;
  if (password.length < 8) {
    request.flash("error", "Password must be at least 8 characters long");
    return response.redirect("/signup");
  }
  next();
}
