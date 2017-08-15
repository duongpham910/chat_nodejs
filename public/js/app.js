var socket = io();

socket.on('connect', function() {
  console.log('Connected socket.io successful');
});

socket.on('message', function(message){
  console.log('New message:' + message.text);
});

$(document).ready(function(){
  $("#message-form").on("submit", function(event){
    event.preventDefault();

    var $message = $(this).find('input[name=message]');

    socket.emit('message', {text: $message.val()});

    $message.val("");
  });
});
