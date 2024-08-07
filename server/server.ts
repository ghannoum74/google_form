const express = require("express");
const server = express();
const cors = require("cors");
import dotenv from "dotenv";
const authRoute = require("./routes/authRoute");

server.use(express.json());

dotenv.config();

server.use(cors());

server.use("/auth", authRoute);

server.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT} ...`);
});
