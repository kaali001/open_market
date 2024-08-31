
const express = require('express');
const router = express.Router();
const { product_by_id,all_products,add_products} = require('../controllers/product');
const auth = require('../middleware/auth'); 


router.get('/:id', product_by_id);
router.get('/', all_products);
router.post('/add',auth, add_products);


module.exports = router;