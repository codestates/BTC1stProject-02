const router = require("express").Router();
const {
  getTransactions,
  setNetwork,
  getNetwork,
} = require("../controllers/transaction.js");

router.get("/", getNetwork, getTransactions);
router.post("/network", setNetwork);

module.exports = router;
