var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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

var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '321329',
    key: '9427491924c03562546e',
    secret: 'd0b5eb4b57e6006ab20b',
    cluster: 'eu',
    encrypted: true
});

pusher.trigger('my-channel', 'my-event', {
    "message": "hi world!"
});

module.exports = app;

var Pusher = require('pusher');

// Open a Pusher connection to the Realtime Reddit API
var pusher = new Pusher("50ed18dd967b455393ed");

// Subscribe to the /r/AskReddit subreddit (lowercase)
var subredditChannel = pusher.subscribe("soccer");

// Listen for new stories
subredditChannel.bind("new-listing", function(listing) {
    // Output listing to the browser console
    console.log(listing);
});