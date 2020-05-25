
import http from 'http'
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
import {postWebHook, sendMessage} from './functions/httpRequest'

var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post("/", (req, res) => {
  console.log(req.body)
  io.on('connection', function (socket) {
    console.log("Connected succesfully to the socket ...");


    // Send news on the socket
    socket.emit('message', req.body.text);

    socket.on('my other event', function (data) {
      console.log(data);
    })
  });


  res.send(200)
})

postWebHook()

// Expose the node_modules folder as static resources (to access socket.io.js in the browser)
app.use('/public', express.static(__dirname + '/node_modules/'));
app.use('/public', express.static(__dirname + '/public/'));



// postWebHook();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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





module.exports = app
