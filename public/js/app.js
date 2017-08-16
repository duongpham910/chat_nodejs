$(document).ready(function(){
  var name = getQueryVariable('name') || 'Anonymous';
  var room = getQueryVariable('room');

  var socket = io();

  socket.on('connect', function() {
    console.log('Connected socket.io successful');
  });

  socket.on('message', function(message){
    console.log('New message:' + message.text);
    var momentTimestamp = moment.utc(message.timestamp);

    $('#messages').append('<p><strong>'+ message.name + ' ' + momentTimestamp.local().format('h:mm a') + ':</strong></p>');
    $('#messages').append('<p>' + message.text + '</p>');
  });


  $('#message-form').on('submit', function(event){
    event.preventDefault();

    var $message = $(this).find('input[name=message]');

    socket.emit('message', {
      text: $message.val(),
      name: name,
      time: moment().valueOf()
    });

    $message.val('');
  });
});
