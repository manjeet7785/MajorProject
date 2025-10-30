const express = require("express");
const router = express.Router();



router.get("/", (req, res) => {
  res.send("i am post")
})
router.get("/:id", (req, res) => {
  res.send("i am post id")
})
router.post("/", (req, res) => {
  res.send("i am post")
})
router.delete("/:id/:id", (req, res) => {
  res.send("i am psot/id/id")
})



module.exports = router;