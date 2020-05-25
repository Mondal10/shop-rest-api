const express = require('express');
const router = express.Router();

// Handling GET request for orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Get all orders'
    });
});

// Handling POST request for orders
router.post('/', (req, res, next) => {
    const { productId, quantity } = req.body;
    const order = {
        productId,
        quantity
    };

    res.status(201).json({
        message: 'Order made success',
        order
    });
});

// GET a order with ID
router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;

    if (id === 'shoes') {
        res.status(200).json({
            message: 'Get order details with ID shoes',
            id
        });
    } else {
        res.status(200).json({
            message: 'No order with such id'
        });
    }
});

// DELETE request for deleting an order
router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;

    res.status(200).json({
        message: 'Order Deleted',
        id
    });
});

module.exports = router;