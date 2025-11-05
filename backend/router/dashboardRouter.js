const express = require("express");
const verifyToken = require("../middlewares/common/verifyToken");
const router = express.Router();
const dashboard = require('../controller/dashboardController');

router.get("/", verifyToken(process.env.ROLE1), dashboard);

module.exports = router;


