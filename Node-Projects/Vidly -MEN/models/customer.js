const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  isGold: { type: Boolean, required: true, default: false },
});

const Customer = mongoose.model('Customer', customerSchema);

function inputValidate(body) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(45).required(),
    phone: Joi.string().min(10).max(15).required(),
    isGold: Joi.boolean().required(),
  });
  return Joi.assert(body, schema);
}

module.exports.validate = inputValidate;
module.exports.Customer = Customer;
