const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const signupModel = new Schema({
  firstname: {
    type: String,
    required: true,
    minLength: 0,
    maxlength: 30,
  },
});
