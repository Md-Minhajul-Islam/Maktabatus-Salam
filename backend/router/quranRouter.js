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
router.post("/", verifyToken(process.env.ROLE1), addQuran);
router.put("/", verifyToken(process.env.ROLE1), updateQuran);
router.delete("/", verifyToken(process.env.ROLE1), deleteQuran);

module.exports = router;
