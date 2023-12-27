

const mongoose =require("mongoose");
const dotenv = require("dotenv");
const jwt=require('jsonwebtoken');
const Joi=require('joi');
const passwordComplexity= require('joi-password-complexity');




// defining schema of the table to store data in this format
const user_schema =new mongoose.Schema({      
    Name :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    phone :{
        type:Number,
        required:true
        

    },
    password :{
        type:String,
        required:true  
    }

})


// user_schema.methods.generateAuthToken = function () {
// 	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
// 		expiresIn: "5d",
// 	});
// 	return token;
// };

user_schema.methods.generateAuthToken = function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
            expiresIn: "5d",
        });
        return token;
    } catch (error) {
        console.error("JWT Sign Error:", error);
        throw error; // Rethrow the error for better visibility
    }
};




// Now we need to create a collections

const User = new mongoose.model("user",user_schema);


const validate = (data) => {
    const schema = Joi.object({
        Name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("email"),
        phone: Joi.number().required().label("phone"),
        password: Joi.string().required().label("password"),
    });
    return schema.validate(data);
};




module.exports={User,validate};