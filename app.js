
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

import {postWebHook} from './functions/httpRequest'

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.post("/", (req, res) => {
  console.log(req.body.text)
  console.log(req.body)
  io.sockets.emit('FromAPI', req.body)
  res.send(200);
});

postWebHook();

http.listen(3000, function(){
  console.log('listening on *:3000');
});






