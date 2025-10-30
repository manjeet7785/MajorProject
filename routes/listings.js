const express = require("express")
const router = express.Router();
const wrapAsync = require("../utilies/wrapAsync.js")
const ExpressError = require("../utilies/ExpressError.js")
const List = require("../models/listing.js")
const flash = require("connect-flash")

// const validateListing = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// }

// router.get("/", (req, res) => {
//   res.send("Hii I am")
// });




//index Route
router.get("/", wrapAsync(async (req, res) => {
  const Alllist = await List.find({});
  res.render("listings/index", { Alllist });
}))

//New Route
router.get("/new", (req, res) => {
  res.render("listings/new")
})

//show Route
router.get("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const show = await List.findById(id).populate("reviews");    //List ko pass kiya hun  models ke listings se // populate me review ke liye use kiya
  if (!show) {
    req.flash("error", "Listing is not exit sorry")
    res.redirect("/listings")
  }
  res.render("listings/show", { show });
}));



// //Create Route
// router.post("/listings", (req, res) => {
//   let create = req.body.listing;
//   // console.log(create);

//   // ab window me add krne ke liye list 
//   const imageUrl = create.image;
//   create.image = {
//     url: imageUrl,
//     filename: 'placeholder-filename' // Provide a temporary filename
//   };
//   const newList = new List(req.body.listing);
//   newList.save();
//   res.redirect("/listing")  //isse list ko add kiya hun list me 
//   // console.log();
// })


//error handling ke liye 
//Create Route
router.post("/", wrapAsync(async (req, res, next) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Send Valid data for listing")
  }
  let create = req.body.listing;
  const imageUrl = create.image;
  create.image = {
    url: imageUrl,
    filename: 'placeholder-filename'
  };

  // const newList = new List(req.body.listing);

  const newList = new List(create);

  await newList.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings")
}))


//Edit Route
router.get("/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await List.findById(id);
  req.flash("success", " Listing Edit!");
  res.render("listings/edit", { listing });
})
)
//Update Route
router.put("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  // 1. Get the data from the form
  let updatedListing = req.body.listing;

  // 2. Re-structure the image field to match the Schema (object with url and filename)
  // The form only sends the URL string, so we need to convert it.
  if (updatedListing.image) {
    updatedListing.image = {
      url: updatedListing.image,
      filename: 'placeholder-filename' // Use a temporary/placeholder filename
    };
  }

  // 3. Perform the update
  await List.findByIdAndUpdate(id, updatedListing);
  req.flash("success", " Listing Update!");
  res.redirect(`/listings/${id}`);
}))

//Delete Route
router.delete("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deleteList = await List.findByIdAndDelete(id)
  req.flash("success", "New Listing Delete!");
  res.redirect("/listings")
  // console.log(deleteList);

}))

module.exports = router;