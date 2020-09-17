const mongoose = require('mongoose');
const Joi = require('Joi');
Joi.objectId = require('joi-objectid')(Joi);
const { genreSchema } = require('./genre');

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: { type: String, required: true },
      phone: { type: String, required: true },
      isGold: { type: Boolean, required: true, default: false },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        maxlength: 255,
        trim: true,
      },
      genre: {
        type: genreSchema,
        required: true,
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
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dateReturned: {
    type: Date,
  },
  rentalCharge: {
    type: Number,
  },
});

const Rental = mongoose.model('Rental', rentalSchema);

function rentalValidate(body) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
    genreId: Joi.objectId().required(),
  });

  return Joi.assert(body, schema);
}

module.exports.validate = rentalValidate;
module.exports.Rental = Rental;
