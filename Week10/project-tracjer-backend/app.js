var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var projectsRouter = require("./routes/projects");
// Import mongoose and configurations ojects
var configs = require("./configs/globals"); // ./ means root directory
var mongoose = require("mongoose");

var cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:4200', // Allow all origins
  optionSuccessStatus: 200
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//Middleware configurations
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions)); // Enable CORS for all routes3

app.use('/', indexRouter);
app.use('/api/projects', projectsRouter);


// Connect to MongoDB using Mongoose
mongoose
  .connect(configs.ConnectionStrings.MongoDB)
  .then(() => {
    console.log("Successfully Connected to mongoDB");
  })
  .catch((err) => {
    console.error("Error Connecting to mongoDB:", err);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
