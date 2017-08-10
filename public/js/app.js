var socket = io();

socket.on('connect', function() {
  console.log('Connected socket.io successful');
});

socket.on('message', function(message){
  console.log('New message:' + message.text);
});
