const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  res.send("i am user")
})
router.get("/:id", (req, res) => {
  res.send("i am user/:id")
})
router.post("/", (req, res) => {
  res.send("i am userpost")
})
router.delete("/:id/:id", (req, res) => {
  res.send("i am user/id/id")
})


module.exports = router;