const express = require("express");
const passport = require("passport");

const {
  register,
  login,
  logout,
  googleCallback
} = require("../controllers/user.controller");

//reset password 
const {resetPasswordLink, resetPassword} =  require("../controllers/resetpassword.controller");

const authUser = require("../middlewares/user.auth");

const authUserRouter = express.Router();

// Register
authUserRouter.post("/register", register);

// Login
authUserRouter.post("/login", login);

// Logout
authUserRouter.post("/logout",authUser ,logout);


//Google Auth Routes

// Step 1: Redirect to Google
authUserRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Step 2: Google Callback
authUserRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false, // important since you're using JWT
  }),
  googleCallback
);

authUserRouter.post("/resetpassword", resetPasswordLink);
authUserRouter.post("/resetpassword/:token", resetPassword);

module.exports = authUserRouter;