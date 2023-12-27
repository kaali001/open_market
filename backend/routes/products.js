
const express = require('express');
const router = require("express").Router();

const Products= require("../models/product");



// POST endpoint to add product details
router.post('/', async (req, res) => {
    try {
      const {product_name,product_image,price, description,origin} = req.body;
      const userID = req.user.id; // Assuming you have user information stored in req.user after authentication
  
      // Create a new product instance
      const product = new Product({
        userID,
        product_name,
        product_image,
        description,
        price,
        origin
      });
  
      // Save the product to the database
      await product.save();
  
      res.status(201).json(product); // Send the newly created product as response
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Internal Server Error' }); // Handle server error
    }
  });

  module.exports = router;