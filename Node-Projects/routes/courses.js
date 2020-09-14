const express = require('express');
const router = express.Router();

//STORING VARIABLES
genres = [
  { id: 1, genre: 'suspense' },
  { id: 2, genre: 'thriller' },
  { id: 3, genre: 'comedy' },
  { id: 4, genre: 'action' },
  { id: 5, genre: 'adventure' },
  { id: 6, genre: 'biopic' },
];

router.get('/', (req, res) => {
  res.send(genres);
});

//GET METHOD
router.get('/:id', (req, res) => {
  const genre = reqValidate(req);
  res.send(genre);
});

//POST METHOD
router.post('/', (req, res) => {
  const { error } = inputValidate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

//PUT METHOD
router.put('/:id', (req, res) => {
  const genre = reqValidate(req);
  const { error } = inputValidate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  genre.name = req.body.name;
  res.send(genre);
});

//DELETE METHOD
router.delete('/:id', (req, res) => {
  const genre = reqValidate(req);
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

//HELPER FUNCTIONS
function reqValidate(req) {
  const genreAtReqID = genres.find((g) => (g.id = parseInt(req.params.id)));
  if (!genreAtReqID) {
    return res
      .status(404)
      .send('Requested file not found. Please try again...');
  }
  return genreAtReqID;
}

function inputValidate(body) {
  schema = {
    name: Joi.string().min(5).required(),
  };
  const result = Joi.validate(body, schema);
  return result;
}

module.exports = router;
