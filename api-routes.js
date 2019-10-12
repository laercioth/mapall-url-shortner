// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: 'Challenge Test for Mapall!'
    });
});
// Import urlShortener controller
var urlShortenerController = require('./urlShortenerController');
// UrlShortener routes
router.route('/urlShortener')
    .post(urlShortenerController.new);
router.route('/:url')
    .get(urlShortenerController.view)

// Export API routes
module.exports = router;