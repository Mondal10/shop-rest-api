const url = require('url');

const getFullURL = (req) => url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
});

module.exports = {
    getFullURL
};