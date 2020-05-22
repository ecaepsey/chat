var socket = io('http://161.35.61.122:3000');

socket.on('message', function (data) {
    location.reload();
    var div = document.getElementById("news-list");
    console.log("Rendering news : ",data);


        div.innerHTML += data


    socket.emit('my other event', { my: 'data' });
});
