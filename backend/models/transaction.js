

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  buyerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  sellerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },
  transactionDate: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
