const { validationLogin, User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "12h",
  });
};

const login = async (req, res) => {
  const { error } = validationLogin.validate(req.body);

  if (error) {
    return res.status(400).json({
      header: "Missing Fields",
      caption:
        "Some required fields are missing from your login request. Please ensure you have entered both your email and password.",
    });
  }

  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json(token);
  } catch (error) {
    console.log(error.message);
    if (error.message === "Incorrect password") {
      return res.status(200).json({
        error: "password dosen't match! Get out bitch!!!",
      });
    }
    res.status(500).json({
      message:
        "Oops! Something went wrong on our end. Please try refreshing the page or come back later.",
    });
  }
};

module.exports = login;
