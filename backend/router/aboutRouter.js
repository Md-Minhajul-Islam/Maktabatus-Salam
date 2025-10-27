const express = require('express')

const { getAbout, addAbout, updateAbout, deleteAbout } = require('../controller/aboutController');
const verifyToken = require("../middlewares/common/verifyToken");

const router = express.Router();

// ABOUT SECTION
router.get('/', getAbout);
router.post('/', verifyToken(null), addAbout);
router.put("/", verifyToken(null), updateAbout);
router.delete("/", verifyToken(null), deleteAbout);


module.exports = router;