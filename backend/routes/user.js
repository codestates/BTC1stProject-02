const router = require("express").Router();
const {
  createUser,
  getUser,
  verifyToken,
  transfer,
} = require("../controllers/user.js");

router.post("/", createUser);
router.get("/", verifyToken, getUser);
router.post("/transfer", verifyToken, transfer);

module.exports = router;
