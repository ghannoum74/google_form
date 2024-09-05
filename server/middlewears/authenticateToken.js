const jwt = require("jsonwebtoken");

const authenticationToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      header: "Unauthorized Access!",
      caption:
        "Clearly indicates that the user does not have permission or that the request is not authenticated.",
      status: 401,
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      console.log("Token Verification Error:", error);
      return res.status(403).json({
        header: "Invalid Token",
        caption:
          "The token used for authentication is invalid. Please log in again to obtain a new token and try accessing this resource. If you believe this is an error, please contact support.",
        status: 403,
      });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticationToken;
