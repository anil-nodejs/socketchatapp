let socket = io();

socket.on('connect', function () {
    console.log("connected to server");

})

socket.on('disconnect', function () {
    console.log("disconnected to server");
});

socket.on("newMessage", function (message) {
    console.log("newMessage", message);
    let li = document.createElement('li');
    li.innerText = `${message.from}:${message.text}`
    document.querySelector('body').appendChild(li);
});



socket.on("newLocationMessage", function (message) {
    console.log("newLocationMessage", message);
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.setAttribute('href', message.url)
    a.innerText = 'My curent location';
    li.appendChild(a);
    document.querySelector('body').appendChild(li);
});

//creating event
document.querySelector('#send').addEventListener('click', function (event) {
    event.preventDefault();
    socket.emit('createMessage', {
        from: "User",
        text: document.querySelector('input[name="message"').value
    }, function () {

    })
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