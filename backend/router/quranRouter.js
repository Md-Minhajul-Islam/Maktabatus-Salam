const express = require("express");
const verifyToken = require("../middlewares/common/verifyToken");
const {
  getQuran,
  addQuran,
  updateQuran,
  deleteQuran,
} = require("../controller/quranController");
const router = express.Router();

router.get("/", getQuran);
router.post("/", verifyToken(null), addQuran);
router.put("/", verifyToken(null), updateQuran);
router.delete("/", verifyToken(null), deleteQuran);

module.exports = router;
