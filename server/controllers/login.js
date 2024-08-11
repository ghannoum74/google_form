const { validationLogin, User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

const login = async (req, res) => {
  const { error } = validationLogin.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    if (error.message === "Incorrect password") {
      return res.status(200).json({
        error: "password dosen't match! Get out bitch!!!",
      });
    }
    res.status(404).json({ error: error.message });
  }
};

module.exports = login;
