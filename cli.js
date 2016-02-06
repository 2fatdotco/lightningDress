var repl = require("repl");

var server = require('http').createServer(console.log);
var socketServer = require('socket.io')(server);

var allConnectedClients = [{id:'lamp1',location:{x:4,y:6}}];

socketServer.on('connection', function (socket) {
	console.log('Dress connected!');
	socketServer.emit('attendance', {
		clients: allConnectedClients
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


var tools = new Tools();

var a = repl.start("tools> ");
a.context.tools=tools;

server.listen(1337);
