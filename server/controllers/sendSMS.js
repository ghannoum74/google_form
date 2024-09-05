// controllers/smsController.js
const { Vonage } = require("@vonage/server-sdk");
const dotenv = require("dotenv");

let verificationCodeStore = {};

dotenv.config();
const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

const generateRandomCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const sendSMS = async (req, res) => {
  const { phoneNumber } = req.body;
  console.log(phoneNumber);
  const from = "GHANACCOUNT";
  const code = generateRandomCode();

  const text = `Your verification code is: ${generateRandomCode()}`;

  verificationCodeStore[phoneNumber] = code;

  // await vonage.sms
  //   .send({ phoneNumber, from, text })
  //   .then((resp) => {
  //     console.log("Message sent successfully");
  //     console.log(resp);
  //     res
  //       .status(200)
  //       .json({ message: "SMS sent successfully", response: resp });
  //   })
  //   .catch((err) => {
  //     console.log("There was an error sending the messages.");
  //     console.error(err);
  //     res.status(500).json({ error: "Failed to send SMS", details: err });
  //   });
};

module.exports = {
  sendSMS,
  verificationCodeStore,
};
