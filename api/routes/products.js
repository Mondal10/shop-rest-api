const express = require('express');
const router = express.Router();

// Handle GET requests on /products route
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handle GET request Here are your products at /products'
    });
});

// Handle POST requests on /products route
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handle POST request Here are your products at /products'
    });
});

// GET a product with ID
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    if (id === 'shoes') {
        res.status(200).json({
            message: 'Get product with ID shoes',
            id
        });
    } else {
        res.status(200).json({
            message: 'whattttt is this id'
        });
    }
});

// PATCH or update a product
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;

    res.status(200).json({
        message: 'updated the product'
    });
});

// DELETE a product
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;

    res.status(200).json({
        message: 'deleted the product'
    });
});

module.exports = router;