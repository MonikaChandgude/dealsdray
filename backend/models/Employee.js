const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployeeSchema = Schema({

  login: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "login",
  },
  image: {
  type: String,
    
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    required: true,
    enum:['HR','Manager','Sales'],
  },
  gender: {
    type: String,
    required: true,
    enum:['Male','Female'],
  },
  course: {
    type: String,
    required: true,
    enum:['MCA','BCA','BSC'],
  },
  createdate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("employee", EmployeeSchema);


