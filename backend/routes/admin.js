
const express = require('express');
const adminAuth = require('../middleware/adminAuth');
// const auth = require('../middleware/auth'); 
const { checkAdmin, logout, allTransactions, getDashboardStats, getUsers, updateUser, deleteUser } = require('../controllers/admin');


const router = new express.Router();



router.post('/logout', logout);
router.get('/check-auth', checkAdmin);

router.get('/statistics', adminAuth, getDashboardStats);
router.get('/users', adminAuth, getUsers);
router.patch('/users/:id', adminAuth, updateUser);
router.delete('/users', adminAuth, deleteUser);
router.get('/transactions', adminAuth, allTransactions);

module.exports = router;
