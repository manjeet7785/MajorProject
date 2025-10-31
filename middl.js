module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req); //all data here

  // console.log(req.path, "..", req.originalUrl); // ye vahi url hai jaa mujhe redirect krna hai 

  if (!req.isAuthenticated()) {

    // if user logged in nhi hai to uski inforamtion save krna pdge ab iske liye session create krna pdega
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to create a listing")
    return res.redirect("/login")
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}