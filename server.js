var PORT = process.env.PORT || 3001;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)
var moment = require('moment');

var clientInfo = {};

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  console.log('User connected via socket.io');

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

    io.to(clientInfo[socket.id].room).emit('message', message);
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
