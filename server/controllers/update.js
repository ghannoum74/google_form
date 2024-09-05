const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");

const update = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the request body contains a password field
    if (req.body.password) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      req.body.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json("Not exist!");
    }

    // Respond with the updated user
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
};

module.exports = { update };
