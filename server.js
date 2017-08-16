var PORT = process.env.PORT || 3001;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)
var moment = require('moment');


app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  console.log('User connected via socket.io');

  socket.on('message', function(message){
    console.log('Message received:' + message.text);

    io.emit('message', message);
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
