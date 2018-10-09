const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

// Set up port for heroku
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// Add event listner ot IO
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Kuktiapke',
        text: 'Hey! What is going on.',
        createdAt: new Date().toLocaleString()
    });

    socket.on('createMessage', (newMessage) => {
        console.log('Create message', newMessage)
    })

    socket.on('disconnect', () => {
        console.log('User is disconnected!');
    });
});

server.listen(port, () => {
    console.log(`Server is on port ${port}`)
});