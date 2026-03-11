// routes/user.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { getProfile } = require('../controllers/user.controller');

// All routes below are protected by auth middleware
router.get('/profile', auth, getProfile);

module.exports = router;