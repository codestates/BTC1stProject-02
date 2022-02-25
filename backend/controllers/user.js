const { User } = require("../models");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const makeSalt = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getToken = (user) => {
  return jwt.sign({ address: user.address }, "BTC-PROJECT-02");
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

      const user = await User.create({
        address,
        pk: encryptedPk,
        salt,
        password: CryptoJS.SHA256(password).toString(),
      });
      const token = getToken(user);

      res.status(200).send({
        newUser: { address, pk: privateKey, accessToken: token },
      });
    } catch (err) {
      console.log(err);
      res.status(404).send({
        message: "server error",
        errMsg: err,
      });
    }
  },
  login: async (req, res) => {
    const { address, password } = req.body;
    console.log(address, password);

    const user = await User.findOne({
      where: {
        address,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "입력하신 Address는 존재하지 않습니다." });
    }
    console.log(user);

    const passwordIsValid = CryptoJS.SHA256(password).toString() === password;
    console.log(passwordIsValid);

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Address에 해당하는 Password가 일치하지 않습니다.",
      });
    }
    const token = getToken(user);

    res.status(200).json({
      address: user.address,
      accessToken: token,
    });
  },
};
