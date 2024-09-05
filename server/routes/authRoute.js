const express = require("express");
const router = express.Router();
const createNewUser = require("../controllers/signup");
const login = require("../controllers/login");
const { checkEmailExists } = require("../controllers/checkEmailExists");
const { checkPhoneExists } = require("../controllers/checkPhoneExists");
const authenticationToken = require("../middlewears/authenticateToken");
const getUserData = require("../controllers/getUserData");
const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { update } = require("../controllers/update");
const { sendSMS } = require("../controllers/sendSMS");
const { verifyNumber } = require("../controllers/verifyNumber");
router.post("/signup", createNewUser);
router.post("/login", login);

router.post("/check-email", checkEmailExists);
router.post("/check-phone", checkPhoneExists);

router.get("/get-user-data/:id", authenticationToken, getUserData);

router.patch("/update/:id", update);

router.post("/send-sms", sendSMS);

router.post("/verify", verifyNumber);

module.exports = router;
