const express = require("express");
const verifyToken = require("../middlewares/common/verifyToken");
const {
  getBook,
  addBook,
  updateBook,
  deleteBook,
} = require("../controller/bookController");
const router = express.Router();
const upload = require("../middlewares/imageUpload/multer");

// Book SECTION
router.get("/", getBook);
router.post("/", verifyToken(null), upload.single("book_photo"), addBook);
router.put("/", verifyToken(null), upload.single("book_photo"), updateBook);
router.delete("/", verifyToken(null), deleteBook);

module.exports = router;
