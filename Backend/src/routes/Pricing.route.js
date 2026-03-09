const router = require('express').Router();
const { getPricing, savePricing } = require('../controllers/Pricing.controller');
const { authenticate } = require('../middlewares/auth.middleware');

// Public  — calculator fetches this on load
router.get('/', getPricing);

// Protected — only logged-in admin can update
router.post('/', authenticate, savePricing);

module.exports = router;