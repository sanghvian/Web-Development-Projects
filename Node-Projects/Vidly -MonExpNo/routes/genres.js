const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.use(express.json());
// CREATING A NEW GENRE aka 'POST'

router.post('/', async (req, res) => {
  const error = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  console.log('No error input from client side \n');
  const genre = new Genre({ name: req.body.name });
  await genre.save();
  res.send(genre);
});

//UPDATING A GENRE aka 'PUT'
router.put('/:id', async (req, res) => {
  const error = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
      },
    },
    { new: true }
  );

  if (!genre) {
    return res.status(404), send('The genre you wanna update was not found');
  }

  res.send(genre);
});

//DELETING A GENRE aka 'DELETE'
router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) {
    return res.status(404).send();
  }

  res.send(genre);
});

//GETTING A SINGLE GENRE aka 'GET'
router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(404).send('The genre you want to find does not exist');
  }
  res.send(genre);
});

module.exports = router;
