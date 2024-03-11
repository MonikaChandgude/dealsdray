const mongoose = require('mongoose')
const { Schema } = mongoose;

const loginSchema = Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  });
  const Login = mongoose.model("login", loginSchema);

  module.exports = Login;
  