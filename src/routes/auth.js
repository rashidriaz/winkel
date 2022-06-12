const express = require("express");
const router = express.Router();
const authGetController = require("../controllers/get-controllers/auth");
const authPostController = require("../controllers/post-controllers/auth");
const auth = require("../middlewares/auth");
const LogoutUser = require("../middlewares/logout-user");

router.get("/login", auth.isNotAuthenticated, authGetController.getLogin);

router.get("/signup", auth.isNotAuthenticated, authGetController.getSignup);

router.get("/forget-password", auth.isNotAuthenticated, authGetController.getForgetPassword);

router.get("/reset-password/:token", LogoutUser, authGetController.getNewPassword);

router.get("/email-verification/:token", LogoutUser, authGetController.getEmailVerificationPage);

router.post("/login",auth.isNotAuthenticated, auth.isEmailVerified, authPostController.postLogin);

router.post("/signup",auth.isNotAuthenticated, auth.checkConfirmPassword,
  auth.checkConfirmPassword, auth.emailAlreadyExists, authPostController.postSignup);

router.post("/forget-password",auth.isNotAuthenticated, authPostController.postForgetPassword);

router.post("/new-password",LogoutUser,auth.checkConfirmPassword, authPostController.postNewPassword);

router.post("/logout", authPostController.postLogout);

module.exports = router;


