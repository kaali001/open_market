const Product = require("./models/product");

const mongoose = require("mongoose");



mongoose
 
   .connect("mongodb+srv://kali001:kali001@cluster0.lwxq1zk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
   .then(() =>console.log(`Database connection Successful.`))
   .catch((error) => console.log(`Database Not Connected.`,error));

// Sample product data
const products = [
  
    {
     
      userID:"66ca090de0c033a694097b61",

      product_name: "Product 2",
      price: 80,
      description: "Description for Product 2",
      color: "Blue",
      category: "Category B",
      product_image: "https://www.gonoise.com/cdn/shop/products/Side04_grande.png?v=1655378358",
      origin: "USA"
    },
    {
        userID:"66ca090de0c033a694097b61",
      product_name: "Product 3",
      price: 120,
      description: "Description for Product 3",
      color: "Green",
      category: "Category A",
      product_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvFFMmu1blOdMwQJGUOUiajI1wl0jiE29pAw&usqp=CAU",
      origin: "USA"
    },
    {
        userID:"66ca090de0c033a694097b61",
      product_name: "Product 4",
      price: 70,
      description: "Description for Product 4",
      color: "Yellow",
      category: "Category C",
      product_image: "product4.jpg",
      origin: "USA"
    },
    {
        userID:"66ca090de0c033a694097b61",
      product_name: "Product 5",
      price: 90,
      description: "Description for Product 5",
      color: "Orange",
      category: "Category B",
      product_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyfhluzBngBDiIoyb-fLaR7PRQd2OVfZByoA&usqp=CAU",
      origin: "USA"
    },
    {
        userID:"66ca090de0c033a694097b61",
      product_name: "Product 6",
      price: 60,
      description: "Description for Product 6",
      color: "Purple",
      category: "Category A",
      product_image: "product6.jpg",
      origin: "USA"
    },
    {
        userID:"66ca090de0c033a694097b61",
      product_name: "Product 7",
      price: 100,
      description: "Description for Product 7",
      color: "Pink",
      category: "Category C",
      product_image: "product7.jpg",
      origin: "USA"
    },
    {
        userID:"66ca090de0c033a694097b61",
      product_name: "Product 8",
      price: 110,
      description: "Description for Product 8",
      color: "Brown",
      category: "Category B",
      product_image: "product8.jpg",
      origin: "USA"
    },
    {
        userID:"66ca090de0c033a694097b61",
      product_name: "Product 9",
      price: 65,
      description: "Description for Product 9",
      color: "Black",
      category: "Category A",
      product_image: "product9.jpg",
      origin: "USA"
    },
    {
        userID:"66ca090de0c033a694097b61",
      product_name: "Product 10",
      price: 95,
      description: "Description for Product 10",
      color: "White",
      category: "Category C",
      product_image: "product10.jpg",
      origin: "USA"
    },
  ];
  
  // Insert the data into the database
  Product.insertMany(products)
    .then(() => {
      console.log("Products inserted successfully!");
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error("Error inserting products:", err);
    });