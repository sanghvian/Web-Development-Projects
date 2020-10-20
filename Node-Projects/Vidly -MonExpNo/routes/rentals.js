const express = require('express');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const { Genre } = require('../models/genre');
const { Rental, validate } = require('../models/rental');
const router = express.Router();

//GET METHOD
router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('_id');
  if (!rentals) {
    return res.status(404).send('Sorry, no rentals were found');
  }
  res.send(rentals);
});

router.get('/:id', async (req, res) => {
  const error = validate(req.body);
  if (error) {
    return res.status(400).send('Bad Request !');
  }

  const rental = await Rental.findById(req.body.id);
  if (!rental) {
    return res.status(404).send('Sorry, the required rental was not found');
  }

  console.log(rental);
  res.send(rental);
});

//POST METHOD
router.use(express.json());

router.post('/', async (req, res) => {
  const error = validate(req.body);
  if (error) {
    return res.status(400).send('Bad Request !');
  }
  //   console.log(req.body);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) {
    return res
      .status(404)
      .send('Sorry, the movie for this rental does not exist on our dB');
  }

  if (movie.numberInStock === 0) {
    return res.send("Sorry, we're out of rental copies of this movie ...");
  }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) {
    return res
      .status(404)
      .send('Sorry, your customer details do not exist on our dB');
  }
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res
      .status(404)
      .send('Sorry, your customer details do not exist on our dB');
  }

  const rental = new Rental({
    movie: {
      title: movie.title,
      genre: {
        name: genre.name,
      },
      dailyRentalRate: movie.dailyRentalRate,
      numberInStock: movie.numberInStock,
    },
    customer: {
      name: customer.name,
      phone: customer.phone,
      isGold: customer.isGold,
    },
  });
  if (!rental) {
    return res.send(404).status('Sorry, your rental could not be processed...');
  }
  await rental.save();

  movie.numberInStock--;
  movie.save();

  res.send(rental);
});

module.exports = router;
