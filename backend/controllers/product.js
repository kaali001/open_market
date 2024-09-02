
const Products= require("../models/product");


// Fetch product by ID
exports.product_by_id = async (req, res) => { 

    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
    
        res.status(200).json(product);
      } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

};


// GET endpoint to fetch all products
exports.all_products = async (req, res) => {

    try {
        const products = await Products.find({});
        res.status(200).json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

// POST endpoint to add product details
exports.add_products = async (req, res) => {

    try {
        const {product_name,product_image,price, description,origin} = req.body.productData;
        const userID = req.body.id; // user information stored in req.user after authentication
        const product = new Products({
          userID, 
          product_name,
          product_image,
          description,
          price,
          origin
        });
    
        await product.save();
    
        res.status(201).json(product); 
      } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal Server Error' }); 
      }

};
