
const express = require('express');
const { login, signup, forgotPassword, resetPassword, getUserDetails, updateUserDetails, getUserBoughtItems, getUserBalance, addUserBalance } = require('../controllers/user');
const { createOrder, verifyPayment } = require('../controllers/payment');

const auth = require('../middleware/auth'); 

const router = express.Router();

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/signup", signup);
router.get('/account/:userId', auth, getUserDetails); 
router.patch('/account/:userId', auth, updateUserDetails); 
router.get('/bought-items/:userId', auth, getUserBoughtItems); 

router.get('/balance/:userId', auth, getUserBalance); 
router.post('/balance/:userId', auth, addUserBalance); 

router.post('/payment/create-order', auth, createOrder);
router.post('/payment/verify-payment', auth, verifyPayment);

module.exports = router;