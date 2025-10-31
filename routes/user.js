const express = require("express")
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utilies/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middl");

router.get("/signup", (req, res) => {
  res.render("signup/signup");
})

router.post("/signup", wrapAsync(async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const register = await User.register(newUser, password)
    console.log(register);
    req.login(register, function (err) {
      if (err) {
        return next();
      }
      req.flash("success", "Welcome to my website");
      res.redirect("/listings")
    })

  }
  catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup")
  }

})
)

router.get("/login", (req, res) => {
  res.render("signup/login");
})

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  (req, res) => {
    req.flash("success", "Welcome back! You are logged in.");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl)
  }
);
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are Logged Out");
    res.redirect("/listings");
  });
});


module.exports = router;