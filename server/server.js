const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());
server.use("/auth", authRoute);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() =>
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT} ...`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
