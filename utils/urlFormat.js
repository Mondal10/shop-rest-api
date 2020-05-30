const url = require('url');

/**
 * Get the full URL from the request and return it
 * 
 * @param {Request} req 
 */
const getFullURL = (req) => url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
});

module.exports = {
    getFullURL
};