
//Makeing Connection to  the Database
const mongoose = require("mongoose");
const dotenv = require("dotenv");



dotenv.config({ path: './config.env' });



mongoose
 
   .connect(process.env.DATABASE_URI)
   .then(() =>console.log(`Database connection Successful.`))
   .catch((error) => console.log(`Database Not Connected.`,error));