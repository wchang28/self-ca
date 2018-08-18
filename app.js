var http = require('http');
var https = require('https');
var fs = require("fs");
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();

var bpj = bodyParser.json({"limit":"999mb"});   // json body middleware
app.use(bpj);

app.use(function(req, res, next) {
	console.log('**********************************************************************');
	console.log('incoming request from ' + req.connection.remoteAddress + ":" + req.connection.remotePort + ', url='+ req.url);
	console.log('method=' + req.method);
	console.log('headers: ' + JSON.stringify(req.headers));
	console.log('**********************************************************************');
	console.log('');
	next();
});

//app.set("json replacer", null);
//app.set("json spaces", 2);

app.get('/', function(req, res) {
	res.json({msg: 'Great! It works'});
});

app.get('/test', function(req, res) {
	res.json({msg: 'good morning'});
});

app.post('/test', function(req, res) {
	res.json(req.body);
});

app.put('/test_put', function(req, res) {
	res.json({});
});

var certificate_file = path.resolve(__dirname, "./server-pem.crt");
var private_key_file = path.resolve(__dirname, "./server-private-key.pem");

var certificate = fs.readFileSync(certificate_file, 'utf8');
var privateKey  = fs.readFileSync(private_key_file, 'utf8');

let credentials = {
	cert: certificate
	,key: privateKey
	,requestCert: false
	,rejectUnauthorized: false
};

var config = {
	host: "0.0.0.0"
	,port: process.env.PORT || 443
};

var server = https.createServer(credentials, app);

var port = config.port;
var host = config.host;

server.listen(port, host, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('app server listening at %s://%s:%s', 'https', host, port);
});