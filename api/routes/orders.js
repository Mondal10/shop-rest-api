const express = require('express');
const router = express.Router();

const { getAllOrders, placeOrder, getOrderById, deleteOrder } = require('../controllers/orders');

// Handling GET request for orders
router.get('/', getAllOrders);

// Handling POST request for orders
router.post('/', placeOrder);

// GET a order with ID
router.get('/:orderId', getOrderById);

// DELETE request for deleting an order
router.delete('/:orderId', deleteOrder);

module.exports = router;