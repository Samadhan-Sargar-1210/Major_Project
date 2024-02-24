const express = require("express");
const router = express.Router({mergeParams : true});
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const { route } = require("./listing.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router.route("/signup")
        .get(userController.renderSignupForm)
        .post(wrapAsync (userController.signup));

router.route("/login")
        .get(userController.renderLoginForm)
        .post(saveRedirectUrl, passport.authenticate("local", { 
            failureRedirect : "/login" , 
            failureFlash : true
        }),
        userController.login
        );

// Logout User - GET Route
router.get("/logout", userController.logout);
router.get("/", (req,res)=>{            // redirect home page
        res.redirect("/listings")
});

module.exports = router;