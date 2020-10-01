const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/authMiddleware');
const { findOneAndUpdate } = require('../models/Review');
const Review = require('../models/Review');

//@desc Go to spae to add a review
//@route GET /reviews/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('reviews/add');
});

//@desc Post a review
//@route POST /reviews
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Review.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.render('error/500');
  }
});

//@desc Show all reviews
//@route GET /reviews
router.get('/', ensureAuth, async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'public' })
      .populate('user')
      .sort({ created_at: 'desc' })
      .lean();
    res.render('reviews/index', { reviews });
  } catch (err) {
    console.log(err);
    res.render('error/500');
  }
});

//@desc Render option to edit a post
//@info GET /reviews/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  const review = await Review.findOne({
    _id: req.params.id,
  }).lean();
  if (!review) {
    return res.render('error/404');
  }
  if (review.user != req.user.id) {
    res.redirect('/reviews');
  } else {
    res.render('reviews/edit', { review });
  }
});
//@desc To actually edit and update a review
//@info PUT /reviews/:id
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let review = await Review.findById(req.params.id).lean();
    if (!review) {
      return res.render('error/404');
    }
    if (review.user != req.user.id) {
      res.redirect('/reviews');
    } else {
      review = await Review.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      res.redirect('/dashboard');
    }
  } catch (err) {
    console.log(err);
    return res.render('error/500');
  }
});

//@desc Delete a review
//@route DELETE /reviews/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    await Review.remove({ _id: req.params.id });
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    return res.render('error/500');
  }
});

//@desc Full review
//@route GET /reviews/:id
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    let review = await Review.findById(req.params.id).populate('user').lean();
    if (!review) {
      return res.render('error/404');
    }
    res.render('reviews/show', { review });
  } catch (err) {
    console.log(err);
    return res.render('error/404');
  }
});

//@desc Show only particular user's reviews
//@route GET /reviews/user/userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
  try {
    const reviews = await Review.find({
      user: req.params.userId,
      status: 'public',
    })
      .populate('user')
      .lean();
    res.render('reviews/index', { reviews });
  } catch (err) {
    console.log(err);
    res.render('error/500');
  }
});
module.exports = router;
