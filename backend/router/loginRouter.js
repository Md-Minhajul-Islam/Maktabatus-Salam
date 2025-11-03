const express = require("express");
const { login, logout } = require("../controller/loginController");

const router = express.Router();


router.post("/", login);
router.post("/logout", logout);

module.exports = router;
