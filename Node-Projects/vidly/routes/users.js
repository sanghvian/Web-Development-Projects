const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');

router.use(express.json());

//POST METHOD
router.post('/', async (req, res) => {
  const error = validate(req.body);
  if (error) {
    return res.status(400).send('Bad Request for user registration');
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send('User with this email is already registered');
  }

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  try {
    await user.save();
    console.log(user);
    const token = user.genAuthToken();
    console.log(token);
    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
