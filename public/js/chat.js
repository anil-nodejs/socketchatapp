let socket = io();
function scrollBottomMessage() {
    let messages = document.querySelector('#message').lastElementChild;
    messages.scrollIntoView();
}
socket.on('connect', function () {
    let serachQuery = window.location.search.substring(1);
    let params = JSON.parse('{"' + decodeURI(serachQuery).replace(/&/g, '","').replace(/\+/g, '').replace(/=/g, '":"') + '"}');
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        }
        else {
            console.log('Successfully logged in');
        }
    })
})

socket.on('disconnect', function () {
    console.log("disconnected to server");
});

// socket.on('updateUsersList', function (users) {
//     console.log(users);
// })

socket.on('updateUsersList', function (users) {
    let ol = document.createElement('ol');
    console.log(users);
    users.forEach(function (user) {
        let li = document.createElement('li');
        li.innerHTML = user;
        ol.appendChild(li);
    });

    let usersList = document.querySelector('#users');
    usersList.innerHTML = "";
    usersList.appendChild(ol);
})

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
    scrollBottomMessage();

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
    scrollBottomMessage();

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