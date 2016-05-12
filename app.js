//packages
var express = require('express');
var FB = require('fb');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();



// global variables -Globals almost always ruin: testability, encapsulation and ease of maintenance.

var appSecret= '448fbdd4a888c54a8bc58f987c25a23e';//Quarrymen app
var appId = '1121742734525327';
global.users = {};
global.waitUsers = [];
var port = 3000;
var home = require('./routes/home.js');
var online = require('./routes/online.js');
var chat = require('./routes/chat.js');


var io = require('socket.io').listen(app.listen(port));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//global middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', home);//web client for testing purposes
app.use('/status', online);
app.use('/chat',chat);

//app.use('/chat',require()) socket chat api

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//socket io connections
io.sockets.on('connection', function (socket) {
	console.log('a user connected');
    //socket.emit('message', { message: 'welcome to the chat' });
  socket.on('chat message', function(msg){
    io.emit('chat message', {user:socket.id,msg:msg});
  });

    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
    socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


module.exports = app;
