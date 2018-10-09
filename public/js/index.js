var socket = io();

socket.on('connect', function () {
    console.log('Connected to server!');

    socket.emit('createMessage', {
        from: 'Oleksandr Liutkevych',
        text: 'Hey. This is my first message.'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('New message', message);
});