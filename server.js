const express = require('express');
const http = require('http');

const port = process.env.PORT || 3000;
const path = require('path');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/isRealString');
const { Users } = require('./utils/users');
//access the public path
const publicPath = path.join(__dirname, 'public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();
console.log("dwjebdewj", users.users);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//public url folder
app.use(express.static(publicPath));

//connecttion events
io.on('connection', (socket) => {
    console.log("A new user connected");



    //join event
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        var let1 = users.addUser(socket.id, params.name, params.room);
        console.log(params.room)
        io.to(params.room).emit('updateUsersList', users.getUserList(params.room));


        socket.emit("newMessage", generateMessage('Admin', `Welcome to the ${params.room}`));

        socket.broadcast.emit("newMessage", generateMessage('Admin', 'New user joined!'));

        callback();
    })
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

//routes access
const chatRoute = require('./routes/routes');
app.use('/', chatRoute);



//server access
server.listen(port, () => {
    console.log("Server is Running..." + port);
})
