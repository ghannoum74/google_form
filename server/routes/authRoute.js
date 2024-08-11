const express = require("express");
const router = express.Router();
const createNewUser = require("../controllers/signup");
const login = require("../controllers/login");
const { checkEmailExists } = require("../controllers/checkEmailExists");
const { checkPhoneExists } = require("../controllers/checkPhoneExists");
const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
router.post("/signup", createNewUser);
router.post("/login", login);

router.post("/check-email", checkEmailExists);
router.post("/check-phone", checkPhoneExists);

const client = new Client();

client.on("qr", (qr) => qrcode.generate(qr, { small: true }));
client.on("ready", () => console.log("WhatsApp client is ready...."));

client.on("ready", () => {
  console.log("WhatsApp client is ready....");
  // Debug the client object or state if needed
});

client.on("error", (error) => {
  console.error("WhatsApp client error:", error);
});

router.get("/message", async (req, res) => {
  try {
    let number = "96176153425@c.us";
    let message = "who's your dady!";
    await client.sendMessage(number, message);
    res.send("Message sen succesfully!");
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Failed to send message.");
  }
});

// client.initialize();

module.exports = router;
