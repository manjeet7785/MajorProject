const express = require("express")
const router = express.Router({ mergeParams: true });

const List = require("../models/listing.js")
const Review = require("../models/reviews.js")
const wrapAsync = require("../utilies/wrapAsync.js")
const ExpressError = require("../utilies/ExpressError.js")


//Reviews
//Post Route of reviews
router.post("/", wrapAsync(async (req, res) => {
  console.log(req.params.id);

  let show = await List.findById(req.params.id);
  let newReviews = new Review(req.body.review)

  show.reviews.push(newReviews);

  await newReviews.save();
  await show.save();

  res.redirect(`/listings/${show._id}`);
}))

//Delete Reviews  Route

router.delete("/:reviewId",
  wrapAsync(async (req, res) => {

    let { id, reviewId } = req.params;
    // 1. Remove the reviewId from the reviews array in the List document
    await List.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })

    // 2. Delete the Review document itself
    await Review.findByIdAndDelete(reviewId)

    // 3. Redirect to the show page using an absolute path
    res.redirect(`/listings/${id}`)
  })
);

module.exports = router;