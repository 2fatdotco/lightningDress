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
var max = 512;          /*   the bottom 8th of a larger scale */
var clockdiv = 8;       /* Clock divider (PWM refresh rate), 8 == 2.4MHz */
var interval = 5;       /* setInterval timer, speed of pulses */
var times = 2;          /* How many times to pulse before exiting */

/*
 * Enable PWM on the chosen pin and set the clock and range.
 */
rpio.open(pin, rpio.PWM);
rpio.pwmSetClockDivider(clockdiv);
rpio.pwmSetRange(pin, range);

/*
 * Repeatedly pulse from low to high and back again until times runs out.
 */
// var direction = 1;
// var data = 0;
// var pulse = setInterval(function() {
//         console.log('Changing:',data,direction);
        rpio.pwmSetData(pin, data);
        // if (data === 0) {
                // direction = 1;
                // if (times-- === 0) {
                        // clearInterval(pulse);
                        rpio.open(pin, rpio.INPUT);
                //         return;
                // }
//         } else if (data === max) {
//                 direction = -1;
//         }
//         data += direction;
// }, interval, data, direction, times);



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

