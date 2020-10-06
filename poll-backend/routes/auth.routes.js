const express = require("express");
const passport = require("passport");
const router = express.Router();

const AuthController = require("../controllers/Auth.controller");

//@route /auth/

router.post("/signup", AuthController.signup);

router.post("/login", passport.authenticate("local"), AuthController.login);

router.get("/logout", AuthController.logout);

module.exports = router;
