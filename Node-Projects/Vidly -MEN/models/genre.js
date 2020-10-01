const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 45,
  },
});

//SETTING UP A COLLECTION AND A SCHEMA IN mongoDB
const Genre = mongoose.model('Genre', genreSchema);

//HELPER FUNCTIONS
function inputValidate(body) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });
  return Joi.assert(body, schema);
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = inputValidate;
