const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//Serve up index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//Establish connection
io.on('connection', function(socket){
    console.log('A new WebSocket connection has been established');
});


//Serve up new price on connection
setInterval(function() {
    let stockprice = Math.floor(Math.random() * 1000);
    //Serve emits price down to client
    io.emit('stock price update', stockprice);
}, 1000);

//Create server and listen on port 8000
http.listen(8000, function() {
    console.log('Listening on *:8000');
});