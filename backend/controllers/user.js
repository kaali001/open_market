// controllers/userController.js

const { User, validate } = require("../models/user");
const  BoughtItem  = require('../models/transaction'); //the model for bought items
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {

    try {

      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) return res.status(400).send('Invalid email or password.');

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).send('Invalid email or password.');

      // Generate JWT
      const token = user.generateAuthToken();

		res.status(200).send({ user:token ,user_id:user._id, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
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
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        const newUser = new User({
          Name: req.body.Name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          pincode: req.body.pincode,
          password: hashedPassword
        });
    
        await newUser.save();
    
        res.status(201).send({ message: "User created successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
      }

};


// Fetch user details
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
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
    const items = await BoughtItem.find({ buyerID: req.params.userId });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
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
