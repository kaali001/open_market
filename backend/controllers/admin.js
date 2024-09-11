// controllers/adminController.js
const {User} = require('../models/user');
const Transaction = require('../models/transaction');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');


dotenv.config({ path: './config.env' });



// to verify if the user is authenticated and alsso an admin
const checkAdmin = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ authenticated: false, isAdmin: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.json({ authenticated: false, isAdmin: false });
    }

    res.json({ authenticated: true, isAdmin: user.isAdmin });
  } catch (ex) {
    res.json({ authenticated: false, isAdmin: false });
  }
};


// logout for admin only
const logout = async(req, res) => {
  try {
    // Clear the token cookie
    res.cookie('token', '', { 
      httpOnly: true, 
      sameSite: 'Strict',
      maxAge: 0 // Set the expiration date to the past
    });

    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};


// Fetching all users in DB
const getUsers = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const query = search ? { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }] } : {};

  try {
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await User.countDocuments(query);
    res.json({ users, total });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};


// Updating the selected users details
const updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("No user found!");
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};


// Deleteing the selected users from DB
const deleteUser = async (req, res) => {
  try {
    const { ids } = req.body; // Array of user IDs
    await User.deleteMany({ _id: { $in: ids } });
    res.json({ message: 'Users deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting users', error });
  }
};


const allTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('buyerID sellerID productID');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};


// Get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    
    const activeUsers = await User.countDocuments({ isActive: true });
    
    const transactions = await Transaction.find();
    
    const totalProfit = transactions.reduce((acc, tx) => acc + tx.amount * 0.1, 0);
    
    const totalTransactions = transactions.length;

    // Time vs User Registration graph data (e.g., group by day)
    const userRegistrations = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      totalUsers,
      activeUsers,
      totalProfit,
      totalTransactions,
      userRegistrations,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error });
  }
};


module.exports = { checkAdmin, logout, allTransactions, getDashboardStats, getUsers, updateUser, deleteUser };
