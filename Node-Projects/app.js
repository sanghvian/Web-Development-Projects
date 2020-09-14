const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const helmet = require('helmet');
const home = require('./routes/home');
const morgan = require('morgan');
const config = require('config');
const Joi = require('joi');
const debug = require('debug')('app:startup');

//USING MIDDLEWARE FUNCTIONS
app.set('view engine', 'pug');
app.set('views', './views');

app.use('/api/courses', courses);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);
// app.use(logger());
app.use(express.json());

//  CONFIGURING APP AS PER ENVIRONMENT AND HANDLING SECRETS
console.log('Application Name : ' + config.get('name'));
console.log('Mail Server Name : ' + config.get('mail.host'));
console.log('Mail Password : ' + config.get('mail.password'));

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
