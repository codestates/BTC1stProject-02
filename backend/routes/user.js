const router = require("express").Router();
const { createUser, getUser, verifyToken } = require("../controllers/user.js");

router.post("/", createUser);
router.get("/", verifyToken, getUser);

module.exports = router;
