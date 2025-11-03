const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/common/verifyToken");
const { getUser, addUser, deleteUser } = require("../controller/userController");

router.get("/", verifyToken(process.env.ROLE1), getUser);
router.post("/", verifyToken(process.env.ROLE1), addUser);
router.delete("/", verifyToken(process.env.ROLE1), deleteUser);

module.exports = router;
