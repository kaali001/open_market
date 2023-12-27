
const mongoose = require('mongoose');
const express = require("express");
const path = require('path');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("express").Router();


const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");


dotenv.config({path:'./config.env'});

require('./Db/conn');




const User = require("./models/user");
const Product = require("./models/product");
const Transaction = require("./models/transaction");


const port = process.env.PORT || 5000;

app.get(
    "/",
    (req,res) =>{
        res.send("Hello world.")
    }
)

//used to get no error on getting the json data
app.use(express.json());
app.use(cors());


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



  

// routing

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/products",productsRoutes);

app.listen(port,function(){
    console.log(`Listening to port at ${port}`)
});