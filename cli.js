var repl = require("repl");

// var server = require('http').createServer(console.log);
// var socketServer = require('socket.io')(server);

// var allConnectedClients = [{id:'lamp1',location:{x:4,y:6}}];

// socketServer.on('connection', function (socket) {
// 	console.log('Something is connected!');
// 	socketServer.emit('attendance', {
// 		clients: allConnectedClients
// 	});
// });


// var http = require('http');

// //Lets define a port we want to listen to
// const PORT=1337; 

// //We need a function which handles reqs and send res
// function handlereq(req, res){
// 	console.log('Client has connected from',req.ip);
//     res.end('It Works!! Path Hit: ' + req.url);
// }

// //Create a server
// var server = http.createServer(handlereq);

// //Lets start our server
// server.listen(PORT, function(){
//     //Callback triggered when server is successfully listening. Hurray!
//     console.log("Server listening on: http://localhost:%s", PORT);
// });


// var WebSocketClient = require('websocket').client;

// var client = new WebSocketClient();

// client.on('connectFailed', function(error) {
//     console.log('Connect Error: ' + error.toString());
// });

// client.on('connect', function(connection) {
//   	console.log('connection opened!',connection);
//     connection.on('error', function(error) {
//         console.log("Connection Error: " + error.toString());
//     });
//     connection.on('close', function() {
//         console.log('echo-protocol Connection Closed');
//     });
//     connection.on('message', function(message) {
//         if (message.type === 'utf8') {
//             console.log("Received: '" + message.utf8Data + "'");
//         }
//     });
// });

// client.connect('ws://192.168.0.25:81');


var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(req, res) {
    console.log((new Date()) + ' Received req for ' + req.url);
    res.writeHead(404);
    res.end();
});

server.listen(1337, function() {
    console.log((new Date()) + ' Server is listening on port 1337');
});

wsServer = new WebSocketServer({
	httpServer: server,
	autoAcceptConnections: false
});

var connection;

wsServer.on('request', function(req) {

	connection = req.accept(null, req.origin);
console.log('connection:');

	for (var i in connection){
		console.log('connection[" '+i+' "] is of type:'+typeof connection[i]);
	}

	console.log((new Date()) + ' Connection accepted.');

	connection.on('message', function(message) {
		if (message.type === 'utf8') {
			console.log('Received Message: ' + message.utf8Data);
			// connection.sendUTF(message.utf8Data);
		}
	});
	connection.on('close', function(reasonCode, description) {
		console.log('Client disconnected!');
	});
});





function Tools(){
	this.name = 'lightning';
	return this;
};

Tools.prototype.up = function(){
	console.log('Asking dress to get brighter');
	socketServer.emit('level',{cmd:'up'});
};

Tools.prototype.down = function(){
	console.log('Asking dress to dim');
	socketServer.emit('level',{cmd:'down'});
};

Tools.prototype.off = function(){
        console.log('Turning dress off.');
        socketServer.emit('level',{cmd:'off'});
};

Tools.prototype.max = function(){
        console.log('Putting dress on full blast');
        socketServer.emit('level',{cmd:'max'});
};

Tools.prototype.set = function(level){
		console.log('Setting light level to:',level);
		var message = "{\"mode\":2,\"level\":"+level+"}";
        connection.send(message);
};

var tools = new Tools();

var a = repl.start("tools> ");
a.context.tools=tools;

// server.listen(1337);
