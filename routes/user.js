const express = require("express")
const route = express.Router()
const  passport = require("../config/passportjwt")

const userController = require("../controllers/userController")

route.get("/profile", 
    passport.authenticate('jwt', {session: false})
    , userController.profile)

route.post("/signin", userController.createSession);
route.post("/signup", userController.createUser);

module.exports = route;
