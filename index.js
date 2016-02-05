// var express = require('express');
// var app = express();
// var server = require('http').Server(app);

// var serveStaticDirectory = process.cwd()+'/assets';

// app.use(express.static(serveStaticDirectory));

// app.get('/', function (req, res) {
// 	console.log('im in');
// 	res.sendfile('index.html');
// });

// server.listen(1338);

function Dress(){
	this.brightness = 10;
	return this;
}

Dress.prototype.updateHardware = function(){
	console.log('Dress brighness is now at',this.brightness);
	return;
};

Dress.prototype.dim = function(){
	if (this.brightness <= 0){
		return;
	}
	else {
		this.brightness--;
	}

	this.updateHardware();
	return;
};

Dress.prototype.illuminate = function(){
	if (this.brightness >= 100){
		return;
	}
	else {
		this.brightness++;
	}

	this.updateHardware();
	return;
};


var lightningDress = new Dress();

var socket= require('socket.io-client')('http://localhost:1337');

socket.on('connect', function(){
	console.log('I be the dress.  I be connected!');
});

socket.on('attendance', console.log);

socket.on('up', function(){
	console.log('Lightning Dress OUT!');
	lightningDress.illuminate();
	return;
});

socket.on('down', function(){
	console.log('Lightning Dress OUT!');
	lightningDress.dim();
	return;
});


socket.on('disconnect', function(){
	console.log('Lightning Dress OUT!');
});

// socket.on('speedTest',$scope.cam.stream.sendSpeedTestResults);

