// routes/user.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const { getProfile, updateProfile } = require('../controllers/user.controller');

// All routes below are protected by auth middleware
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

// Optional role-specific dashboards (you can uncomment these)
router.get('/investor/dashboard', auth, role('investor'), (req, res) => {
  res.json({ 
    message: 'Welcome investor!', 
    data: { stats: { investments: 5, portfolio: '$1.2M' } } 
  });
});

router.get('/entrepreneur/dashboard', auth, role('entrepreneur'), (req, res) => {
  res.json({ 
    message: 'Welcome entrepreneur!', 
    data: { stats: { startups: 2, funding: '$500K' } } 
  });
});

module.exports = router;