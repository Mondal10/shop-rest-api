const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Handle 404 error
app.use('/', (req, res, next) => {
    const error = new Error('Not Found');

    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const { status, message } = error;
    res.status(status || 500);

    res.json({
        message
    });
});

module.exports = app;