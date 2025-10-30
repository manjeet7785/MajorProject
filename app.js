const express = require("express");
const app = express();
const mongoose = require("mongoose");
const List = require("./models/listing.js")
const Review = require("./models/reviews.js")
const path = require("path")
const methodOver = require("method-override")
const ejsmate = require("ejs-mate")
const wrapAsync = require("./utilies/wrapAsync.js")
const ExpressError = require("./utilies/ExpressError.js")
const listings = require("./routes/listings.js")
const reviewsRoute = require("./routes/router.js")
const session = require("express-session")
const flash = require("connect-flash");


const url = "mongodb+srv://admin:Raja1234%40%40@manjeet.jihoesr.mongodb.net/major";

async function main() {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connection successful!");

    app.listen(8080, () => {
      console.log("Server is listening to port 8080");
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOver("_method"));
app.engine("ejs", ejsmate)
app.use(express.static(path.join(__dirname, "/public")))


const sessionOptions = {
  secret: "mysecret ye kuch bhi likh skhte",
  resave: false,
  saveUninitialized: true,
  Cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
}

app.use(session(sessionOptions))  // now we check the session is working or not so simply go with application and cookies
app.use(flash()) // routes se phle flash ko use krna hai kyu route pya hi kamm krna hai

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
})

app.use("/listings", listings)
app.use("/listings/:id/reviews", reviewsRoute)

// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found!"));
// });

// This middleware catches any request that hasn't been handled by routes above it.
// app.use((req, res, next) => {
//   next(new ExpressError(404, "Page Not Found!"));
// });
// custom error handle isko create ki help se kr rhe hai 

// app.use((err, req, res, next) => {
//   // res.send("Something went Wrong!")
//   let { statusCode, message } = err;
//   res.status(statusCode).send(message);
// })

app.use((err, req, res, next) => {
  // Provide default values for safety
  let { statusCode = 500, message = "Something Went Wrong!" } = err;
  res.render("error.ejs", { err })
})

main();
// app.get("/listening", async (req, res) => {
//   let sample = new List({
//     title: "My New Home",
//     description: "My the nae",
//     price: 12000,
//     location: "Lucknow",
//     country: "India"
//   })
//   await sample.save();
//   console.log("Saple wala ");
//   res.send("Successfully")

// })

// main(); 