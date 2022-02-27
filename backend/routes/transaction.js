const router = require("express").Router();
const { getNetworkAndWeb3 } = require("../controllers/middlewares.js");
const {
  getTransactions,
  getMyFromTransactions,
} = require("../controllers/transaction.js");
const { verifyToken } = require("../controllers/user.js");

router.get("/", getNetworkAndWeb3, getTransactions);
router.get("/from-mine", verifyToken, getNetworkAndWeb3, getMyFromTransactions);
// router.post("/network", setNetwork);

module.exports = router;
