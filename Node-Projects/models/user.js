const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
console.log(process.env.ACCESS_TOKEN_SECRET);
userSchema.methods.genAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET);
  return token;
};

const User = mongoose.model('User', userSchema);

function validate(body) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(200).required(),
    email: Joi.string().min(1).max(100),
    password: Joi.string().min(6).max(25),
  });
  return Joi.assert(body, schema);
}

module.exports.User = User;
module.exports.validate = validate;
