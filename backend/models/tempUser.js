
const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  otp: { type: String, required: true },
  otpExpires: { type: Date, required: true },
});

const TempUser = mongoose.model("TempUser", tempUserSchema);

module.exports = TempUser;
