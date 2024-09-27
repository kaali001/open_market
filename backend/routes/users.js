
const express = require('express');
const { login, signup, forgotPassword, resetPassword, getUserDetails, updateUserDetails, getUserBoughtItems, getUserBalance,getUserListedItems,getUserSoldItems,getBuyerDetails, addUserBalance } = require('../controllers/user');
const { createOrder, verifyPayment } = require('../controllers/payment');
const {verifyOtp, resendOtp} = require('../controllers/verifyOtp');
const auth = require('../middleware/auth'); 

const router = express.Router();

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/signup", signup);
router.post("/verifyOtp", verifyOtp);
router.post("/resendOtp", resendOtp);

router.get('/account/:userId', auth, getUserDetails); 
router.patch('/account/:userId', auth, updateUserDetails); 
router.get('/bought-items/:userId', auth, getUserBoughtItems); 
router.get('/listed-items/:userId/products',auth,getUserListedItems);
router.get('/sold-items/:userId/products',auth,getUserSoldItems)
router.get('/buyer-details/:buyerId',auth, getBuyerDetails);

router.get('/balance/:userId', auth, getUserBalance); 
router.post('/balance/:userId', auth, addUserBalance); 

router.post('/payment/create-order', auth, createOrder);
router.post('/payment/verify-payment', auth, verifyPayment);

module.exports = router;