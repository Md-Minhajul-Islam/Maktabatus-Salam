const express = require("express");
const router = express.Router();
const { donation, success, fail, cancel } = require("../controller/donationController");

router.post("/", donation);
router.post("/success/:tran_id", success);
router.post("/fail", fail);
router.post("/cancel", cancel);

module.exports = router;
