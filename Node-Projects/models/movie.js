const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true,
  },
  genre: {
    type: genreSchema,
    // required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

function movieValidate(body) {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
  });
  return Joi.assert(body, schema);
}

const Movie = mongoose.model('Movie', movieSchema);

module.exports.Movie = Movie;
module.exports.validate = movieValidate;
