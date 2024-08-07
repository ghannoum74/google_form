const express = require("express");
const server = express();
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/authRoute");
const { default: mongoose } = require("mongoose");

server.use(express.json());

dotenv.config();

server.use(cors());

server.use("/auth", authRoute);
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() =>
    server.listen(process.env.PORT, () => {
      console.log(`server is running on port ${process.env.PORT} ...`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
