const express = require("express");
const verifyToken = require("../middlewares/common/verifyToken");
const { register, login, logout } = require("../controller/loginController");

const router = express.Router();


router.post("/", login);
router.post("/logout", logout);
router.post("/register", verifyToken(process.env.ROLE1), register);

module.exports = router;
