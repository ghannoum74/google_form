const { verificationCodeStore } = require("../controllers/sendSMS");

const verifyNumber = (req, res) => {
  const { code, phoneNumber } = req.body;

  if (verificationCodeStore[phoneNumber] === code) {
    res.status(200).json({ message: "Verification successful" });
  } else {
    res.status(400).json({ error: "Invalid verification code" });
  }
};

module.exports = { verifyNumber };
