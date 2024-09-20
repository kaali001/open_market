
const Products= require("../models/product");


// Fetch product by ID
exports.product_by_id = async (req, res) => { 

    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        // Modify image URL to include server path
        product.product_image = `${req.protocol}://${req.get('host')}/${product.product_image}`;

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

         // Modify image URL for each product
         const updatedProducts = products.map(product => {
          product.product_image = `${req.protocol}://${req.get('host')}/${product.product_image}`;
          return product;
      });
       
      res.status(200).json(updatedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

// POST endpoint to add product details

exports.add_products = async (req, res) => {
  try {
    const { product_name, price, description, origin } = req.body; // extract text fields
    const userID = req.body.id; // user information stored in req.user after authentication
    const product_image = req.file.path;

    const product = new Products({
      userID,
      product_name,
      product_image, 
      price,
      description,
      origin,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};