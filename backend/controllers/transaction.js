const { Tx } = require("../models");

module.exports = {
  getTransactions: async (req, res) => {
    try {
      let tx = await Tx.findAll({
        limit: 10,
        order: [["createdAt", "DESC"]],
      });
      res.status(200).send({
        tx,
      });
    } catch (err) {
      console.log(err);
      res.status(404).send({
        message: "server error",
        errMsg: err,
      });
    }
  },
};
