const express = require("express");
const router = express.Router();
const analyzer = require('../controller/analyzerController');

router.post("/", analyzer);

module.exports = router;