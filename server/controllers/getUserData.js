const { User } = require("../models/userModel");

const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        header: "User Not Found!",
        caption:
          "Sorry, the page you’re looking for does not exist or has been moved. Please check the URL for typos or return to the home page to continue browsing. If you need help, feel free to contact support.",
        status: 404,
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      header: "Server Error",
      caption: "An error occurred while processing your request.",
      details: error.message,
      status: 500,
    });
  }
};

module.exports = getUserData;
