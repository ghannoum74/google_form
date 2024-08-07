const express = require("express");
const router = express.Router();
const createNewUser = require("../controllers/signup");
const login = require("../controllers/login");
router.post("/signup", createNewUser);
router.post("/login", login);

module.exports = router;
