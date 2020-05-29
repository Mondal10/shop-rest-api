const express = require('express');
const mongoose = require('mongoose');

const Product = require('../models/product');
const { getFullURL } = require('../../utils/urlFormat');

const router = express.Router();

// Handle GET requests on /products route
router.get('/', (req, res, next) => {
    const URL = getFullURL(req);

    Product.find()
        .select('_id name price') // select only needed fields(columns)
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => ({
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
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

// Handle POST requests on /products route
router.post('/', (req, res, next) => {
    const { name, price } = req.body;
    const URL = getFullURL(req);

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name,
        price
    });

    // save method is provided by mongoose used on mongoose models
    product.save()
        .then(result => {
            res.status(201).json({
                message: 'Created product seccessfully',
                createdProduct: {
                    _id: result._id,
                    name: result.name,
                    price: result.price,
                    request: {
                        type: 'GET',
                        url: `${URL}${result._id}`
                    }
                }
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
    const URL = getFullURL(req);

    Product.findById(id)
        .select('_id name price')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        type: 'GET',
                        url: `${URL}`
                    }
                });
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
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    const URL = getFullURL(req);

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product updated',
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

// DELETE a product
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Deleted product successfully',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;