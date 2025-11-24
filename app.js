// app.js
// main express setup for the pet care manager

require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const connectDB = require('./config/db');
const indexRouter = require('./routes/index');
const petsRouter = require('./routes/pets');

const app = express();

// connect to MongoDB
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);
app.use('/pets', petsRouter);

// catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// ---- IMPORTANT PART: actually start the server ----
const PORT = process.env.PORT || 3000;

// lil log so I know it's alive
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// optional export (not needed for now but doesn't hurt)
module.exports = app;