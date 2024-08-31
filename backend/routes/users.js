
const express = require('express');
const { login,signup,getUserDetails, updateUserDetails, getUserBoughtItems, getUserBalance, addUserBalance } = require('../controllers/user');

const auth = require('../middleware/auth'); 

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get('/account/:userId', auth, getUserDetails); 
router.patch('/account/:userId', auth, updateUserDetails); 
router.get('/bought-items/:userId', auth, getUserBoughtItems); 
router.get('/balance/:userId', auth, getUserBalance); 
router.post('/balance/:userId', auth, addUserBalance); 

module.exports = router;