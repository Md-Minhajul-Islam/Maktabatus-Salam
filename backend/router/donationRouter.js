const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/common/verifyToken");
const { donation, success, fail, cancel, list} = require("../controller/donationController");

router.post("/", donation);
router.post("/success/:tran_id", success);
router.post("/fail", fail);
router.post("/cancel", cancel);
router.get("/list", verifyToken(process.env.ROLE1), list);

module.exports = router;
