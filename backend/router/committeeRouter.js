const express = require("express");
const verifyToken = require("../middlewares/common/verifyToken");
const {
  getCommittee,
  addCommittee,
  updateCommittee,
  deleteCommittee,
} = require("../controller/committeeController");

const router = express.Router();


router.get("/", getCommittee);
router.post("/", verifyToken(null), addCommittee);
router.put("/", verifyToken(null), updateCommittee);
router.delete("/", verifyToken(null), deleteCommittee);

module.exports = router;
