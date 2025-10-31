const express = require("express")
const router = express.Router({ mergeParams: true });

const List = require("../models/listing.js")
const Review = require("../models/reviews.js")
const wrapAsync = require("../utilies/wrapAsync.js")
const ExpressError = require("../utilies/ExpressError.js");
const { isLoggedIn } = require("../middl.js");


//Reviews
//Post Route of reviews
router.post("/", isLoggedIn, wrapAsync(async (req, res) => {
  console.log(req.params.id);

  let show = await List.findById(req.params.id);
  let newReviews = new Review(req.body.review)

  show.reviews.push(newReviews);

  await newReviews.save();
  await show.save();
  req.flash("success", "Review Added successfully.");
  res.redirect(`/listings/${show._id}`);
}))

//Delete Reviews  Route

router.delete("/:reviewId", isLoggedIn,
  wrapAsync(async (req, res) => {

    let { id, reviewId } = req.params;
    // 1. Remove the reviewId from the reviews array in the List document
    await List.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })

    // 2. Delete the Review document itself
    await Review.findByIdAndDelete(reviewId)

    // 3. Redirect to the show page using an absolute path
    req.flash("success", "Listing Deleted successfully.");
    res.redirect(`/listings/${id}`)

  })
);

module.exports = router;