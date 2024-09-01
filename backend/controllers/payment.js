const Razorpay = require('razorpay');
const crypto = require('crypto');
const {User} = require('../models/user');
const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });




const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// function to generate a Razorpay order.

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
   
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };
    
    const order = await razorpayInstance.orders.create(options);

   
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while creating the order',
      error: error.message,
    });
  }
};



//verify the payment and update the user’s balance.


exports.verifyPayment = async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = req.body;
      
      const userId = req.user._id; 
  
      const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
      hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
      const generatedSignature = hmac.digest('hex');
  
      if (generatedSignature === razorpay_signature) {
        // Updating the user's balance
        const user = await User.findById(userId);
        user.balance += parseFloat(amount);
        await user.save();
  
        res.status(200).json({
          success: true,
          message: 'Payment verified and balance updated',
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Invalid signature',
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong while verifying payment',
        error: error.message,
      });
    }
  };