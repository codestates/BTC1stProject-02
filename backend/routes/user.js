const router = require("express").Router();
const { getNetworkAndWeb3, getWeb3 } = require("../controllers/middlewares.js");
const {
  createUser,
  getUser,
  verifyToken,
  transfer,
  login,
  restore,
} = require("../controllers/user.js");

router.post("/", getNetworkAndWeb3, createUser);
router.get("/", verifyToken, getWeb3, getUser);
router.post("/transfer", verifyToken, transfer);
router.post("/login", login);
router.post("/restore", restore);

module.exports = router;
