const express = require("express");
const jwt = require("jsonwebtoken");
const { validationSignup, User } = require("../models/userModel");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

const createNewUser = async (req, res) => {
  // if (req.user) {
  //   return res
  //     .status(401)
  //     .json({ message: "Already logged in. Cannot sign up again." });
  // }
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
    console.log(error.message);
    if (error.message === "all fields must be fieled!") {
      return res.status(400).json({
        message:
          "An error occurred while setting up the request. Please try again or check your network connection.",
      });
    } else if (error.message === "Phone number already in use!")
      res.status(400).json({
        message: "Phone already in use",
      });
    else if (error.message === "Email already in use!") {
      res.status(400).json({
        message: "Email already in use!",
      });
    } else {
      res
        .status(500)
        .json({
          message:
            "Oops! Something went wrong on our end. Please try refreshing the page or come back later.",
        });
    }
  }
};

module.exports = createNewUser;
