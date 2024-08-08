const express = require("express");
const router = express.Router();
const createNewUser = require("../controllers/signup");
const login = require("../controllers/login");
const { checkEmailExists } = require("../controllers/checkEmailExists");
const { checkPhoneExists } = require("../controllers/checkPhoneExists");

router.post("/signup", createNewUser);
router.post("/login", login);

router.post("/check-email", checkEmailExists);
router.post("/check-phone", checkPhoneExists);
module.exports = router;
