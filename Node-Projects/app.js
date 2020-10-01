const express = require('express');
const app = express();
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const helmet = require('helmet');
const home = require('./routes/home');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:startup');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

//DEFINING THE ROUTES
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const authrz = require('./middleware/authrz');

//CONNECTING TO mongoDB
mongoose
  .connect('mongodb://localhost/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Mongo DB connected...'))
  .catch((err) => console.log(err.message));

//USING MIDDLEWARE FUNCTIONS
app.set('view engine', 'pug');
app.set('views', './views');

//SETTING UP ROUTES FOR DIFFERENT STUFF
app.use('/api/rentals', rentals);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/genres', genres);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);
// app.use(logger());
app.use(express.json());

//  CONFIGURING APP AS PER ENVIRONMENT AND HANDLING SECRETS
console.log('Application Name : ' + config.get('name'));
console.log('Mail Server Name : ' + config.get('mail.host'));
// console.log('Mail Password : ' + config.get('mail.password'));
// if (!config.get('vidly_jwtPrivateKey')) {
//   console.error('FATAL ERROR : jwtPrivateKey is not defined '), process.exit(1);
// }

//LOGGING REQUESTS ONLY IN DEVELOPMENT ENVIRONMENT
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan is running');
  console.log('Morgan is logging requests...');
}

//LISTENING ON PORT
port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
