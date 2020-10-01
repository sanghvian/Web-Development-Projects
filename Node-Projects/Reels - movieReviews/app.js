const path = require('path');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const passport = require('passport');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');

//Config
dotenv.config({ path: './config/config.env' });

//Passport config
require('./config/passport')(passport);

//Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Method Override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

//Logging (morgan)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/reviews', require('./routes/reviews'));

//Handlebars helpers
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs');

//View engine (express-handlebars)
app.engine(
  '.hbs',
  exphbs({
    helpers: { formatDate, stripTags, truncate, editIcon, select },
    defaultLayout: 'main',
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');

//Call for connecting to database
connectDB();

const port = process.env.PORT || 3000;
app.listen(
  port,
  console.log(`Connected in ${process.env.NODE_ENV} mode on port ${port}`)
);
