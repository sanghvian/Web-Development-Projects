const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'My Express App',
    heading: 'Hello and welcoe to Vidly Movie Rental Services',
  });
});

module.exports = router;
