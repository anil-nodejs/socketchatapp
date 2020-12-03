let socket = io();

socket.on('connect', function () {
    console.log("connected to server");

})

socket.on('disconnect', function () {
    console.log("disconnected to server");
});

socket.on("newMessage", function (message) {
    const formattedTime = moment(message.createdAt).format('LT');
    const template = document.querySelector('#message-template').innerHTML;
    const html = Mustache.render(template,
        {
            from: message.from,
            text: message.text,
            createdAt: formattedTime
        });
    const div = document.createElement('div');
    div.innerHTML = html
    document.querySelector('#message').appendChild(div);

});



socket.on("newLocationMessage", function (message) {

    console.log("newLocationMessage", message);
    const formattedTime = moment(message.createdAt).format('LT');

    const template = document.querySelector('#location-message-template').innerHTML;
    const html = Mustache.render(template,
        {
            from: message.from,
            url: message.url,
            createdAt: formattedTime
        });
    const div = document.createElement('div');
    div.innerHTML = html
    document.querySelector('#message').appendChild(div);

});

//creating event
document.querySelector('#send').addEventListener('click', function (event) {
    event.preventDefault();
    socket.emit('createMessage', {
        from: "User",
        text: document.querySelector('input[name="message"').value
    }, function () {
        document.querySelector('input[name="message"').value = '';
    });
});

//send location 
document.querySelector('#send-location').addEventListener('click', function (event) {
    if (!navigator.geolocation) {
        return alert('Geo location is not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.latitude
        })
    }, function () {
        alert('Unable to fetch location')
    })
})