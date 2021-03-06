const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Not Authorized, token reqired'
        });
    }
};