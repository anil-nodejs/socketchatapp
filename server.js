const express = require('express');
const http = require('http');
const port = process.env.PORT || 3000;
const path = require('path');
const socketIO = require('socket.io')
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
    socket.emit("newMessage", {
        from: "Admin",
        text: "Welcome to the SAY Chat App!",
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit("newMessage", {
        from: "Admin",
        text: "New user joined!",
        createdAt: new Date().getTime()
    });
    //create event
    socket.on('createMessage', (message) => {
        console.log("created Message", message);
        io.emit('newMessage',
            {
                form: message.from,
                text: message.text,
                createdAt: new Date().getTime()
            });
        // socket.broadcast.emit(
        //     {
        //         form: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     });
    });

    //disconnect event
    socket.on('disconnect', () => {
        console.log("user was disconnected");
    });
});

//server access
server.listen(port, () => {
    console.log("Server is Running..." + port);
})
