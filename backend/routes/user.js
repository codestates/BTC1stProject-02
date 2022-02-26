const router = require("express").Router();
const {
  createUser,
  getUser,
  verifyToken,
  transfer,
  login,
} = require("../controllers/user.js");

router.post("/", createUser);
router.get("/", verifyToken, getUser);
router.post("/transfer", verifyToken, transfer);
router.post("/login", login);

module.exports = router;
