const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Order = require('../models/order');
const Product = require('../models/product');
const { getFullURL } = require('../../utils/urlFormat');

// Handling GET request for orders
router.get('/', (req, res, next) => {
    const URL = getFullURL(req);

    Order.find()
        .select('_id product quantity') // select only needed fields(columns)
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                orders: docs.map(doc => ({
                    _id: doc._id,
                    quantity: doc.quantity,
                    productId: doc.product,
                    request: {
                        type: 'GET',
                        url: `${URL}${doc._id}`
                    }
                }))
            };
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// Handling POST request for orders
router.post('/', (req, res, next) => {
    const { productId, quantity } = req.body;
    const URL = getFullURL(req);

    Product.findById(productId)
        .then(product => {
            if (!product) {
                res.status(404).json({
                    message: 'Product not found'
                });
            }

            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity,
                product: productId
            });

            return order.save();
        })
        .then(result => {
            res.status(201).json({
                message: 'Order placed successfully',
                createdOrder: {
                    _id: result._id,
                    productId: result.product,
                    quantity
                },
                request: {
                    type: 'GET',
                    url: `${URL}${result._id}`
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Product not found', error: err });
        });
});

// GET a order with ID
router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    const URL = getFullURL(req);

    Order.findById(id)
        .select('_id product quantity')
        .exec()
        .then(order => {
            if (!order) {
                res.status(404).json({
                    message: 'Product not found'
                });
            }

            res.status(200).json({
                order,
                request: {
                    type: 'GET',
                    url: `${URL}`
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// DELETE request for deleting an order
router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;

    Order.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order Deleted successfully',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;