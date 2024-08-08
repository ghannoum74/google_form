const express = require("express");
const { User } = require("../models/userModel");

const checkPhoneExists = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const existPhone = await User.findOne({ phoneNumber });

    if (existPhone) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { checkPhoneExists };
