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

var rpio = require('rpio');

var pin = 12;           /* P12/GPIO18 */
var range = 1024;       /* LEDs can quickly hit max brightness, so only use */
var max = 768;          /*   the bottom 8th of a larger scale */
var clockdiv = 8;       /* Clock divider (PWM refresh rate), 8 == 2.4MHz */
var stepSize = 20;

// rpio.open(pin, rpio.INPUT);


function Dress(){
	this.brightness = stepSize;
	return this;
}

Dress.prototype.updateHardware = function(){
	console.log('Dress brighness is now at',this.brightness);
	rpio.pwmSetData(pin, this.brightness);
	return;
};

Dress.prototype.off = function(){
        this.brightness = 0;
        this.updateHardware();
        return;
};

Dress.prototype.max = function(){
        this.brightness = max;
        this.updateHardware();
        return;
};

Dress.prototype.dim = function(){
	if (this.brightness <= -stepSize){
		this.brightness = 0;
	}
	else {
		this.brightness = this.brightness - stepSize;
	}

	this.updateHardware();
	return;
};

Dress.prototype.illuminate = function(){
	if (this.brightness+stepSize >= max){
		this.brightness = max;
	}
	else {
		this.brightness = this.brightness+stepSize;
	}

	this.updateHardware();
	return;
};

Dress.prototype.explode = function(){

        this.brightness = max;
        this.updateHardware();

        return;
};


var lightningDress = new Dress();

var socket= require('socket.io-client')('http://localhost:1337');

socket.on('connect', function(){
	console.log('I be the dress.  I be connected!');
	rpio.open(pin, rpio.PWM);
	rpio.pwmSetClockDivider(clockdiv);
	rpio.pwmSetRange(pin, range);

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


socket.on('level', function(info){

	switch (info.cmd){
		case 'down':
		        lightningDress.dim();
		break;
                case 'up':
                        lightningDress.illuminate();
                break;
                case 'off':
                        lightningDress.off();
                break;
                case 'max':
                        lightningDress.max();
                break;

		default:break;
	}

        return;
});

socket.on('disconnect', function(){
	console.log('Lightning Dress OUT!');
});

// socket.on('speedTest',$scope.cam.stream.sendSpeedTestResults);

