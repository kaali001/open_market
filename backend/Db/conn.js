


//Makeing Connection to  the Database
const mongoose = require("mongoose");

mongoose
 
   .connect("mongodb://127.0.0.1:27017/Open_Market")
   .then(() =>console.log(`Database connection Successful.`))
   .catch((error) => console.log(`Database Not Connected.`,error));