var express = require('express');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var volunteers = require('./routes/volunteers');
var records = require('./routes/records');
var elections = require('./routes/elections');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Configuration
// let MongoURI = process.env.MONGOURI || 'mongodb://localhost/ndcDB'; process.env.PORT_DEV
let MongoURI = process.env.MONGOURI || process.env.MONGOURI_DEV; 
mongoose.connect(MongoURI, function(err, res){
  if(err) {
    console.log('Error connecting to: ' + MongoURI + '. ' + err);
  } else {
    console.log('Successful connection to ' + MongoURI + '.');
  }
});

// Models
var Contact = require('./models/contact');
var Volunteer = require('./models/volunteer');
var User = require('./models/user');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());
app.use(cors());

/* CORS STUFF OUT WITH JWT? */

// not sure
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// for testing with ionicdevapp
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//      next();
// });


app.use('/', index);
app.use('/users', users);
app.use('/volunteers', volunteers);
app.use('/records', records);
app.use('/elections', elections);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
