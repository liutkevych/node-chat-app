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
        from: "Admin",
        text: "Wellcome to chat",
        createdAt: new Date().toLocaleString()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().toLocaleString()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().toLocaleString()
        });

        // // It will show new message to all users eccept owner
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().toLocaleString()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User is disconnected!');
    });
});

server.listen(port, () => {
    console.log(`Server is on port ${port}`)
});