const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.use(express.json());

//POST METHOD
router.post('/', async (req, res) => {
  const error = validate(req.body);
  if (error) {
    return res.status(400).send('Bad Request for user registration');
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Invalid email or password');
  }

  user = await bcrypt.compare(req.body.password, user.password);
  if (!user) {
    return res.status(400).send('Invalid email or password');
  }

  const token = user.genAuthToken();
  res.send(token);
});

function validate(body) {
  const schema = Joi.object({
    email: Joi.string().min(1).max(100),
    password: Joi.string().min(6).max(25),
  });
  return Joi.assert(body, schema);
}

module.exports = router;
