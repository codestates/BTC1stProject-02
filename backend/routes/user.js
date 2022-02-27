const router = require("express").Router();
const {
  createUser,
  getUser,
  verifyToken,
  transfer,
  login,
  restore,
} = require("../controllers/user.js");

router.post("/", createUser);
router.get("/", verifyToken, getUser);
router.post("/transfer", verifyToken, transfer);
router.post("/login", login);
router.post("/restore", restore);

module.exports = router;
