// controllers/userController.js

const { User, validate } = require("../models/user");
const  BoughtItem  = require('../models/transaction'); 
const Token = require("../models/token");
const TempUser = require("../models/tempUser");
const sendEmail = require("../utils/sendEmail");
const Products= require("../models/product");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const crypto = require('crypto');


dotenv.config({ path: './config.env' });



exports.login = async (req, res) => {

    try {

      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) return res.status(400).send('Invalid email or password.');

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).send('Invalid email or password.');

      // Generate JWT
      const token = user.generateAuthToken();


      const isProduction = process.env.NODE_ENV === 'production';

      if (user.isAdmin) {
        res.cookie('token', token, {
          httpOnly: true,
          secure: isProduction, // Only use secure cookies in production
          sameSite: isProduction ? 'None' : 'Strict', // Cross-site for production, strict otherwise
          maxAge: 60 * 60 * 1000, // 1 hour
        });
      }
      

    res.status(200).send({ token, user_id: user._id, isAdmin: user.isAdmin, message: "logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }

};


exports.forgotPassword = async (req, res) => {
  try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).send("User with given email doesn't exist");

      let token = await Token.findOne({ userId: user._id });
 
      if (!token) {
          token = await new Token({
              userId: user._id,
              token: crypto.randomBytes(32).toString("hex"),
          }).save();
      }

      const url = `${process.env.FRONTEND_URL}/reset-password/${token.token}`;
      
      await sendEmail(
        user.email,
        "Password Reset",
        `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Dear ${user.Name},</p>
          <p>We received a request to reset your password. Please click the button below to reset your password:</p>
          <a href="${url}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #007BFF; border-radius: 5px; text-decoration: none;">Reset Password</a>
          <p>If you did not request this, please ignore this email.</p>
          <p>Thank you,</p>
          <p>The U-mart Team</p>
        </div>
        `
      );
      
     
      res.send(`Password reset link sent to ${user.email}`);
  } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).send("An error occurred");
  }
};


exports.resetPassword = async (req, res) => {
  try {
      const { token } = req.params;
      const { password } = req.body;
 
      const passwordResetToken = await Token.findOne({ token });

      if (!passwordResetToken) return res.status(400).send("Invalid or expired password reset token");

      const user = await User.findById(passwordResetToken.userId);
      if (!user) return res.status(400).send("User not found");


      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword;
      await user.save();

      await passwordResetToken.deleteOne();

      res.send("Password reset successfully");
  } catch (error) {
    console.log(error);
      res.status(500).send("An error occurred");
  }
};


exports.signup = async (req, res) => {
  try {
      const { error } = validate(req.body);
      if (error) {
          return res.status(400).send({ message: error.details[0].message });
      }

      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
          return res.status(409).send({ message: "User with given email already exists!" });
      }

      const existingTempUser = await TempUser.findOne({ email: req.body.email });
      if (existingTempUser) {
          await TempUser.deleteOne({ email: req.body.email });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generate a 6-character OTP
      const otpExpires = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

      const tempUser = new TempUser({
          Name: req.body.Name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          pincode: req.body.pincode,
          password: hashedPassword,
          otp,
          otpExpires
      });

      await tempUser.save();
      
     

       // Create JWT with email and send it to the user
       const user_id = jwt.sign({ email: req.body.email }, process.env.JWTPRIVATEKEY, { expiresIn: '35m' });



      const emailContent = `
          <h1>Email Verification</h1>
          <p>Your OTP for signup verification is: <strong>${otp}</strong></p>
          <p>This OTP is valid for 5 minutes.</p>
      `;
      await sendEmail(req.body.email, "Email Verification", emailContent);

      res.status(200).send({ message: "OTP sent to your email",user_id });

  } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('Name email address phone pincode state');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user details
exports.updateUserDetails = async (req, res) => {
  try {
  
    const { Name, phone, address,pincode } = req.body;
    const user = await User.findByIdAndUpdate(req.params.userId, { Name, phone, address,pincode }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Fetch bought items
exports.getUserBoughtItems = async (req, res) => {
  try {
    // Find transactions where the user is the buyer and then populate product details from Product model.
    const transaction = await BoughtItem.find({ buyerID: req.params.userId })
      .populate('productID', 'product_name price product_image');

    if (transaction.length > 0) {
      const updatedTransaction = transaction.map(item => ({
        ...item.toObject(),
        productID: {
          ...item.productID.toObject(),
          product_image: `${req.protocol}://${req.get('host')}/${item.productID.product_image}`
        }
      }));
      res.status(200).json(updatedTransaction);
    } else {
      res.status(200).json({ message: 'No bought items found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Fetch user listed products
exports.getUserListedItems = async (req, res) => {
  try {
    const listedProducts = await Products.find({ userID: req.params.userId });

    if (listedProducts.length > 0) {
      const updatedListedProducts = listedProducts.map(product => ({
        ...product.toObject(),
        product_image: `${req.protocol}://${req.get('host')}/${product.product_image}`
      }));
      res.status(200).json(updatedListedProducts);
    } else {
      res.status(200).json({ message: 'No listed products for sell.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch products sold by the user
exports.getUserSoldItems = async (req, res) => {
  try {
 
    const soldItems = await BoughtItem.find({ sellerID: req.params.userId }).populate('productID', 'product_name price product_image');
    if(soldItems.length > 0){
      const updatedSoldProducts = soldItems.map(item => ({
        ...item.toObject(),
        productID: {
          ...item.productID.toObject(),
          product_image: `${req.protocol}://${req.get('host')}/${item.productID.product_image}`
        }
      }));
      res.status(200).json(updatedSoldProducts);
    } else {
      res.status(200).json({message: 'No sold item found.'});
    }
   
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sold items' });
  }
};

// Fetch buyer details by buyerID
exports.getBuyerDetails = async (req, res) => {
  try {
    const buyer = await User.findById(req.params.buyerId).select('Name email phone pincode address');
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }
    res.status(200).json(buyer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching buyer details' });
  }
};


// Fetch user balance
exports.getUserBalance = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add balance to user account
exports.addUserBalance = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.balance += amount;
    await user.save();
    res.status(200).json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
