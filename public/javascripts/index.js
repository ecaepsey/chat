var socket = io('http://161.35.61.122:3000');

socket.on('message', function (data) {
    var div = document.getElementById("news-list");
    console.log("Rendering news : ",data);
    //
    // for(var i = 0;i < data.length;i++){
    //     var newsItem = data[i];
    //     div.innerHTML += "<h3>" + newsItem.title + ' <small>'+ newsItem.date + "</small></h3><br>";
    // }
    //
    // socket.emit('my other event', { my: 'data' });
});
