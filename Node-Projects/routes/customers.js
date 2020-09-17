const { Customer, validate } = require('../models/customer');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find();
  console.log(customers);
  res.send(customers);
});

router.use(express.json());
//CREATE("POST")
router.post('/', async (req, res) => {
  const error = validate(req.body);
  if (error) {
    for (let field in error.details) {
      return res.status(404).send(error.details[field].message);
    }
  }

  const customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });

  await customer.save();
  console.log(customer);
  res.send(customer);
});

//UPDATE ("PUT")

router.put('/:id', async (req, res) => {
  const error = validate(req.body);
  if (error) {
    for (let field in error.details) {
      return res.status(400).send(error.details[field].message);
    }
  }

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
      },
    },
    { new: true }
  );

  if (!customer) {
    return res.status(404).send('Customer not found.....');
  }

  console.log(customer);
  res.send(customer);
});

//REMOVE("DELETE")
router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) {
    return res.status(404).send('Customer not found.....');
  }

  console.log(customer);
  res.send(customer);
});

//GET SINGLE CUSTOMER("GET")
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(404).send('Customer not found....');
  }

  console.log(customer);
  res.send(customer);
});

module.exports = router;
