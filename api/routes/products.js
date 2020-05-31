const express = require('express');
const router = express.Router();

const { getAllProducts, addProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/products');

// Handle GET requests on /products route
router.get('/', getAllProducts);

// Handle POST requests on /products route
router.post('/', addProduct);

// GET a product with ID
router.get('/:productId', getProductById);

// PATCH or update a product
/* example: should be in array
[
    {
    	"propName": "name",
    	"value": "Nike shoe"
    },
    {
    	"propName": "price",
    	"value": "5000"
    }
]
*/
router.patch('/:productId', updateProduct);

// DELETE a product
router.delete('/:productId', deleteProduct);

module.exports = router;