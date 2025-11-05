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
router.post("/", verifyToken(process.env.ROLE1), addBlog);
router.put("/", verifyToken(process.env.ROLE1), updateBlog);
router.delete("/", verifyToken(process.env.ROLE1), deleteBlog);

module.exports = router;
