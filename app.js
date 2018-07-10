'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const app = express();

// ------- Connect to DB ------- //

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/movie-project', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});


// ------- Routes ------- //

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// const moviesRouter = require('./routes/movies');
// const verifyRouter = require('./routes/verify')


// ------- View engine setup ------- //

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// ------- Middlewares ------- //

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/movies', moviesRouter);
// app.use('/verify', verifyRouter);

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use((req, res, next) => {
  app.locals.currentUser = req.session.currentUser;
  next();
});


// ------- Error handler ------- //

app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

app.use((err, req, res, next) => {
  console.error('ERROR', req.method, req.path, err);

  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;
