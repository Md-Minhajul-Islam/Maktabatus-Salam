const express = require("express");
const verifyToken = require("../middlewares/common/verifyToken");
const {
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
} = require("../controller/eventController");

const router = express.Router();
const upload = require("../middlewares/imageUpload/multer");

// Event SECTION
router.get("/", getEvent);
router.post("/", verifyToken(null), upload.array("event_photo", 5), addEvent);
router.put("/", verifyToken(null), upload.array("event_photo", 5), updateEvent);
router.delete("/", verifyToken(null), deleteEvent);

module.exports = router;
