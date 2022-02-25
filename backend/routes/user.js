const router = require("express").Router();
const { user } = require("../controllers/user.js");

router.post("/", user);

module.exports = router;
