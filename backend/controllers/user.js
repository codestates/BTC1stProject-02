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
  return jwt.sign({ address: user.address }, process.env.TOKEN_SECRET);
};

module.exports = {
  createUser: async (req, res) => {
    try {
      const { password } = req.body;
      console.log(password);
      console.log(process.env.TOKEN_SECRET);

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
  getUser: async (req, res) => {
    const address = req.address;
    const resBalance = web3.utils.fromWei(
      await web3.eth.getBalance(address),
      "ether"
    );
    console.log(resBalance);

    const user = await User.findOne({
      where: {
        address,
      },
    });

    if (resBalance !== user.balance) {
      user.balance = resBalance;
      await user.save();
    }

    return res.status(200).json({
      user: {
        address: user.address,
        balance: user.balance,
      },
    });
  },
  verifyToken: (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
      // return res.status(403).json("message: 인증을 위한 토큰을 전송해주세요.");
      throw new Error("인증을 위한 토큰을 전송해주세요.");
    } else {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          // return res
          //   .status(401)
          //   .json({ message: "유효하지 않은 토큰입니다. 인증에 실패하였습니다." });
          throw new Error("유효하지 않은 토큰입니다. 인증에 실패하였습니다.");
        } else {
          // console.log(decoded);
          req.address = decoded.address;
          next();
        }
      });
    }
  },
};
