
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


var debug = require('debug')('chat:server');

var socketIO = require( "socket.io");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */


const io = socketIO(server);


io.on('connection', function (socket) {
  console.log("Connected succesfully to the socket ...");

  var news = [
    {title: 'The cure of the Sadness is to play Videogames', date: '04.10.2016'},
    {title: 'Batman saves Racoon City, the Joker is infected once again', date: '05.10.2016'},
    {title: "Deadpool doesn't want to do a third part of the franchise", date: '05.10.2016'},
    {title: 'Quicksilver demand Warner Bros. due to plagiarism with Speedy Gonzales', date: '04.10.2016'},
  ];

  // Send news on the socket
  socket.emit('news', news);

  socket.on('my other event', function (data) {
    console.log(data);
  })
});





/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


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


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


