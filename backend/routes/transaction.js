const router = require("express").Router();
const { getNetworkAndWeb3 } = require("../controllers/middlewares.js");
const {
  getTransactions,
  setNetwork,
} = require("../controllers/transaction.js");

router.get("/", getNetworkAndWeb3, getTransactions);
router.post("/network", setNetwork);

module.exports = router;
