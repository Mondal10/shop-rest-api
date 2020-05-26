const express = require('express');
const mongoose = require('mongoose');

const Product = require('../models/product');

const router = express.Router();

// Handle GET requests on /products route
router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// Handle POST requests on /products route
router.post('/', (req, res, next) => {
    const { name, price } = req.body;

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name,
        price
    });

    // save method is provided by mongoose used on mongoose models
    product.save()
        .then(result => {
            res.status(201).json({
                message: 'POST request at /products',
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

});

// GET a product with ID
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: `No valid entry found for id: ${id}`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// PATCH or update a product
/* example:
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
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

});

// DELETE a product
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;