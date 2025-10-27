const express = require("express");
const verifyToken = require("../middlewares/common/verifyToken");

const {
  getBlog,
  addBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");
const router = express.Router();

router.get("/", getBlog);
router.post("/", verifyToken(null), addBlog);
router.put("/", verifyToken(null), updateBlog);
router.delete("/", verifyToken(null), deleteBlog);

module.exports = router;
