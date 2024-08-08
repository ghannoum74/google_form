const express = require("express");
const { User } = require("../models/userModel");

const checkEmailExists = async (req, res) => {
  const { email } = req.body;

  try {
    const existEmail = await User.findOne({ email });

    if (existEmail) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { checkEmailExists };
