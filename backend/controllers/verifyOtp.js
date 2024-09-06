
const TempUser = require("../models/tempUser");
const {User} = require("../models/user");
const crypto = require('crypto');
const sendEmail = require("../utils/sendEmail");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });

exports.verifyOtp = async (req, res) => {
    try {
        const { otp, token } = req.body;

        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        const email = decoded.email;


        const tempUser = await TempUser.findOne({ email });
        
      
        if (!tempUser) {
            return res.status(404).send({ message: "No pending signup for this email" });
          }
    
 
        if (Date.now() > tempUser.otpExpires) {
            return res.status(200).send({ message: "OTP has expired" });
        }


        if (tempUser.otp !== otp) {
            return res.status(400).send({ message: "Invalid OTP" });
        }
  
        const newUser = new User({
            Name: tempUser.Name,
            email: tempUser.email,
            phone: tempUser.phone,
            address: tempUser.address,
            pincode: tempUser.pincode,
            password: tempUser.password,
        });

        await newUser.save();
        await TempUser.deleteOne({ email: tempUser.email });

 

        res.status(200).send({ message: "OTP verified" });
    } catch (error) {
        res.status(500).send({ message: "Server error",error });
    }
};


exports.resendOtp = async (req, res) => {
    try {
      const { token } = req.body;

     // Verify JWT and extract email
     const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
     const email = decoded.email;

     const tempUser = await TempUser.findOne({ email });

      if (!tempUser) {
        return res.status(404).send({ message: "No pending signup for this email" });
      }
  
      // Generate new OTP
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString(); 
      tempUser.otp = newOtp;
      tempUser.otpExpires = Date.now() + 5 * 60 * 1000; 
  
      
      await tempUser.save();
  
      // Send new OTP to user's email
      const emailContent = `
      <h1>Email Verification</h1>
      <p>Your OTP for signup verification is: <strong>${newOtp}</strong></p>
      <p>This OTP is valid for 10 minutes.</p>
      `;
      await sendEmail(tempUser.email, "Email Verification", emailContent);
  
      res.status(200).send({ message: "OTP resent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
  
