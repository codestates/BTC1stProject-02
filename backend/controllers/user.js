const { User } = require("../models");
var CryptoJS = require("crypto-js");

const makeSalt = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = {
  user: async (req, res) => {
    try {
      const { password } = req.body;

      const { address, privateKey } = await web3.eth.accounts.create();
      const salt = makeSalt(18);

      // Encrypt
      var encryptedPk = CryptoJS.AES.encrypt(privateKey, salt).toString();

      // Decrypt
      // var bytes = CryptoJS.AES.decrypt(encryptedPk, salt);
      // var originalText = bytes.toString(CryptoJS.enc.Utf8);

      const newUser = await User.create({
        address,
        pk: encryptedPk,
        salt,
        password: CryptoJS.SHA256(password).toString(),
      });

      res.status(200).send({
        newUser,
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
