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
router.post("/", verifyToken(process.env.ROLE1), addNotice);
router.put("/", verifyToken(process.env.ROLE1), updateNotice);
router.delete("/", verifyToken(process.env.ROLE1), deleteNotice);

module.exports = router;
