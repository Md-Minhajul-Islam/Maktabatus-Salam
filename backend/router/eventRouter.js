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
router.post("/", verifyToken(process.env.ROLE1), upload.array("event_photo", 5), addEvent);
router.put("/", verifyToken(process.env.ROLE1), upload.array("event_photo", 5), updateEvent);
router.delete("/", verifyToken(process.env.ROLE1), deleteEvent);

module.exports = router;
