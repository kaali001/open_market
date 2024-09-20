


const mongoose =require("mongoose");




// defining schema of the table to store data in this format
const product_schema =new mongoose.Schema({   
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
      },
    product_name :{
        type:String,
        required:true
    }, 
    product_image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        // required:true
    },
    price :{
        type:Number,
        required:true
       
    },
    description:{
        type:String,
        required:true
        

    },
    createdAt: {
        type: Date,
        default: Date.now
        
      },
    origin:{
        type:String,
        required:true  
    },
    availability: {
        type: Boolean,
        default: true  
    }

})



// Now we need to create a collections

const Product = new mongoose.model("product",product_schema);

module.exports= Product;