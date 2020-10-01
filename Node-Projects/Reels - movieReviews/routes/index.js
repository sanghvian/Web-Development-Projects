const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/authMiddleware');
const Review = require('../models/Review');

//@desc Login page
//@route GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'loginLayout',
  });
});

//@desc Dashboard page
//@route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id }).lean();
    res.render('dashboard', {
      name: req.user.firstName,
      lastName: req.user.lastName,
      reviews,
    });
  } catch (err) {
    res.render('error/500');
  }
});

module.exports = router;
