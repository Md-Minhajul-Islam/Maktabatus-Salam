const express = require("express");
const verifyToken = require("../middlewares/common/verifyToken");

const router = express.Router();

router.get("/", verifyToken(null), (req, res, next) => {
  res.status(200).json({ loggedIn: true });
});

module.exports = router;
