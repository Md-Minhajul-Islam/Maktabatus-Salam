const express = require("express");
const verifyToken = require("../middlewares/common/verifyToken");
const {
  getNotice,
  addNotice,
  updateNotice,
  deleteNotice,
} = require("../controller/noticeController");

const router = express.Router();

// Notice SECTION
router.get("/", getNotice);
router.post("/", verifyToken(null), addNotice);
router.put("/", verifyToken(null), updateNotice);
router.delete("/", verifyToken(null), deleteNotice);

module.exports = router;
