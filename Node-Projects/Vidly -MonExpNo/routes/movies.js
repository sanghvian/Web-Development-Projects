const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

router.use(express.json());
// CREATING A NEW GENRE aka 'POST'

router.post('/', async (req, res) => {
  const error = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  console.log('No error input from client side \n');
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.send(400).send('Invalid genre');
  }
  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();
  res.send(movie);
});

//UPDATING A GENRE aka 'PUT'
router.put('/:id', async (req, res) => {
  const error = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = await Genre.findById(genreId);

  if (!genre) {
    return res.status(400), send('The genre is invalid !');
  }
  const movie = await Movie.findByIdAndUpdate(movieId, {
    $set: {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      dailyRentalRate: req.body.dailyRentalRate,
      numberInStock: req.body.numberInStock,
    },
  });
  if (!movie) {
    return res.status(400).send('The movie you wanna update was not found');
  }

  res.send(movie);
});

//DELETING A GENRE aka 'DELETE'
router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!genre) {
    return res.status(404).send();
  }

  res.send(genre);
});

//GETTING A SINGLE GENRE aka 'GET'
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).send('The movie you want to find does not exist');
  }
  res.send(movie);
});

module.exports = router;
