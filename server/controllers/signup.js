const express = require("express");
const jwt = require("jsonwebtoken");
const { validationSignup, User } = require("../models/userModel");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

const createNewUser = async (req, res) => {
  console.log(req.body);
  const { error } = validationSignup.validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  const {
    firstname,
    lastname,
    day,
    year,
    month,
    gender,
    email,
    phoneNumber,
    password,
  } = req.body;
  try {
    const user = await User.signup(
      firstname,
      lastname,
      day,
      month,
      year,
      gender,
      email,
      phoneNumber,
      password
    );
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = createNewUser;
