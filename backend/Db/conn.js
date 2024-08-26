


//Makeing Connection to  the Database
const mongoose = require("mongoose");

mongoose
 
   .connect("mongodb+srv://kali001:kali001@cluster0.lwxq1zk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
   .then(() =>console.log(`Database connection Successful.`))
   .catch((error) => console.log(`Database Not Connected.`,error));