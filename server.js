const express = require('express');
const http = require('http');
const port = process.env.PORT || 3000;
const path = require('path');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message')
//access the public path
const publicPath = path.join(__dirname, 'public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
//public url folder
app.use(express.static(publicPath));

//connecttion events
io.on('connection', (socket) => {
    console.log("A new user connected");
    socket.emit("newMessage", generateMessage('Admin', 'Welcome to the SAY Messenger!'));

    socket.broadcast.emit("newMessage", generateMessage('Admin', 'New user joined!'));
    //create event
    socket.on('createMessage', (message, callback) => {
        console.log("created Message", message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        // socket.broadcast.emit(
        //     {
        //         form: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     });\
        callback('This is the severs!');
    });
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng))
    })
    //disconnect event
    socket.on('disconnect', () => {
        console.log("user was disconnected");
    });
});

//server access
server.listen(port, () => {
    console.log("Server is Running..." + port);
})
