// controllers/user.controller.js
const User = require('../models/User');

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update current user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { bio, company, investmentHistory, preferences } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update only fields that are sent in the request
    if (bio !== undefined) user.profile.bio = bio;
    if (company !== undefined) user.profile.company = company;
    if (investmentHistory !== undefined) user.profile.investmentHistory = investmentHistory;
    if (preferences) {
      if (preferences.categories !== undefined) user.profile.preferences.categories = preferences.categories;
      if (preferences.riskTolerance !== undefined) user.profile.preferences.riskTolerance = preferences.riskTolerance;
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      profile: user.profile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};