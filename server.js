var express = require('express');
//var http = require('http');
var path = require('path');
var socket_io = require('socket.io');

var app = express();
//var http_server = http.Server(app);
var port = process.env.PORT || 3000;
app.set('port', port);
var server = app.listen(port);
console.log("App listening on port " + port);

var io = socket_io.listen(server);  //http_server);

app.use('/public', express.static(__dirname + '/public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap'))

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});

	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});
