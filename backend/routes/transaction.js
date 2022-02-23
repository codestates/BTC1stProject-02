const router = require("express").Router();
const { getTransactions } = require("../controllers/transaction.js");

router.get("/", getTransactions);

module.exports = router;
