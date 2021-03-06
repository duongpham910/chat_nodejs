var PORT = process.env.PORT || 3001;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)
var moment = require('moment');

var clientInfo = {};

function getCurrentUsers(socket){
  var currentUser = clientInfo[socket.id];
  var users = [];

  if (typeof currentUser == 'undefined') {
    return;
  }

  Object.keys(clientInfo).forEach(function (socketId){
    var userInfo = clientInfo[socketId];
    if (userInfo.room == currentUser.room) {
      users.push(userInfo.name)
    }
  });

  socket.emit('message', {
    text: 'Current users: ' + users.join(', '),
    name: 'System',
    time: moment().valueOf()
  })
}

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  console.log('User connected via socket.io');

  socket.on('disconnect', function(){
    var userData = clientInfo[socket.id];

    if (typeof userData !== 'undefined') {
      socket.leave(userData.room);
      io.to(userData.room).emit('message', {
        text: userData.name + ' has left!',
        name: 'System',
        time: moment().valueOf()
      });
      delete clientInfo[socket.id];
    }
  });

  socket.on('joinRoom', function(req){
    clientInfo[socket.id] = req;
    socket.join(req.room);
    socket.broadcast.to(req.room).emit('message', {
      text: req.name + ' has joined!',
      name: 'System',
      time: moment().valueOf(),
    })
  });

  socket.on('message', function(message){
    console.log('Message received:' + message.text);

    if (message.text == "@currentUser") {
      getCurrentUsers(socket);
    } else {
      io.to(clientInfo[socket.id].room).emit('message', message);
    }
  });

  socket.emit('message', {
    text: 'Welcome to the chat application!',
    name: 'System',
    time: moment().valueOf()
  });
});

http.listen(PORT, function(){
  console.log('Listening on *:3001');
});
