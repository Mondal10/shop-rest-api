const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Refereing to products schema
        required: true
    },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);