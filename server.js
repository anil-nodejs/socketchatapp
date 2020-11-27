const express = require('express');
const http = require('http');
const port = process.env.PORT || 3000;
const path = require('path');
const socketIO = require('socket.io')
const publicPath = path.join(__dirname, 'public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
//public url folder
app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log("A new user connected");
    socket.emit("newMessage", {
        from: "Mike",
        text: "Hi, How r you!"
    });
    socket.on('createMessage', (message) => {
        console.log("created Message", message);
        io.emit('newMessage',
            {
                form: message.from,
                text: message.text,
                createdAt: new Date().getTime()
            })
    });
    socket.on('disconnect', () => {
        console.log("user was disconnected");
    });
});
//server access
server.listen(port, () => {
    console.log("Server is Running..." + port);
})
