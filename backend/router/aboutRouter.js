const express = require('express')

const { getAbout, addAbout, updateAbout, deleteAbout } = require('../controller/aboutController');
const verifyToken = require("../middlewares/common/verifyToken");

const router = express.Router();

// ABOUT SECTION
router.get('/', getAbout);
router.post('/', verifyToken(process.env.ROLE1), addAbout);
router.put("/", verifyToken(process.env.ROLE1), updateAbout);
router.delete("/", verifyToken(process.env.ROLE1), deleteAbout);


module.exports = router;