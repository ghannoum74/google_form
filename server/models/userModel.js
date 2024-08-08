const mongoose = require("mongoose");
const joi = require("joi");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    match: /^[A-Za-z]+(?:[ '\\-][A-Za-z]+)*$/,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    match: /^[A-Za-z]+(?:[ '\\-][A-Za-z]+)*$/,
  },
  day: {
    type: Number,
    required: true,
    min: 1,
    max: 30,
  },
  month: {
    type: String,
    enum: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1950,
    max: 2024,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Rather not say", "Custom"],
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 30,
    match: /^[a-zA-Z0-9]{2,}[0-9]{0,3}@(gmail|hotmail).com$/,
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
    maxlength: 8,
    match: /^(81|76|77|03|71|70)[0-9]{6}$/,
  },
  password: {
    type: String,
    required: true,
  },
});

//***************************static signup method****************************//
userSchema.statics.signup = async function (
  firstname,
  lastname,
  day,
  month,
  year,
  gender,
  email,
  phoneNumber,
  password
) {
  if (
    !firstname ||
    !lastname ||
    !day ||
    !month ||
    !year ||
    !gender ||
    !email ||
    !phoneNumber ||
    !password
  ) {
    throw Error("all fields must be fieled!");
  }
  const existEmail = await this.findOne({ email });
  if (existEmail) {
    throw Error("Email already in use!");
  }

  // const existphoneNumber = await this.findOne({ phoneNumber });
  // if (existphoneNumber) {
  //   throw Error("Phone number already in use!");
  // }

  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await this.create({
      firstname,
      lastname,
      day,
      year,
      month,
      gender,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//***************************static login method****************************//
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("all fields must be filied!");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("email dosen't exist");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw Error("password don't match...Get out basted");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

const validationSignup = joi.object({
  firstname: joi
    .string()
    .pattern(new RegExp("^[A-Za-z]+(?:[ '\\-][A-Za-z]+)*$"))
    .min(3)
    .max(20)
    .required(),
  lastname: joi
    .string()
    .pattern(new RegExp("^[A-Za-z]+(?:[ '\\-][A-Za-z]+)*$"))
    .min(3)
    .max(20)
    .required(),
  day: joi.number().required(),
  month: joi
    .string()
    .valid(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    )
    .required(),
  year: joi.number().min(1950).max(2024).required(),
  gender: joi.valid("Male", "Female", "Rather not say", "Custom").required(),
  email: joi
    .string()
    .email()
    .pattern(new RegExp("^[a-zA-Z0-9]{2,}[0-9]{0,3}@(gmail|hotmail).com$"))
    .max(30)
    .required(),
  phoneNumber: joi
    .string()
    .max(8)
    .pattern(new RegExp("^(81|76|77|03|71|70)[0-9]{6}$")),
  password: joi.string().required(),
});

const validationLogin = joi.object({
  email: joi
    .string()
    .email()
    .pattern(new RegExp("^[a-zA-Z0-9]{2,}[0-9]{0,3}@(gmail|hotmail).com$"))
    .max(30)
    .required(),
  password: joi.string().required(),
});

module.exports = { User, validationSignup, validationLogin };
