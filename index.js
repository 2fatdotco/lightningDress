var express = require('express');
var app = express();
var server = require('http').Server(app);

var serveStaticDirectory = process.cwd()+'/assets';

app.use(express.static(serveStaticDirectory));

app.get('/', function (req, res) {
	console.log('im in');
	res.sendfile('index.html');
});



server.listen(1338);
