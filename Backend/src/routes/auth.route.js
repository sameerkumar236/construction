const router     = require('express').Router();
const controller = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/seed-admin',      controller.seedAdmin);     // one-time first admin
router.post('/login',           controller.login);
router.post('/refresh',         controller.refresh);
router.post('/logout',          controller.logout);
router.get ('/me',              authenticate, controller.getMe);

// ── Admin management (protected, max 2 admins) ────────────────────────────────
router.get   ('/admins',        authenticate, controller.listAdmins);
router.post  ('/admins',        authenticate, controller.addAdmin);
router.delete('/admins/:id',    authenticate, controller.removeAdmin);

module.exports = router;