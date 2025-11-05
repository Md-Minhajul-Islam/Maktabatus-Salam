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
router.post("/", verifyToken(process.env.ROLE1), addCommittee);
router.put("/", verifyToken(process.env.ROLE1), updateCommittee);
router.delete("/", verifyToken(process.env.ROLE1), deleteCommittee);

module.exports = router;
