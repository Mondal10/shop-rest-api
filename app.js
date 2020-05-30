const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

// Connecting to MongoDB
mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_ATLAS_PSWD}@cluster0-j6p5m.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Extract json and makes easily readible
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Header setup for Cross Origin Access
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');

        return res.status(200).json({});
    }

    // So that it won't block the incoming request
    // and go through other routes
    next();
});

// Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

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