var http = require('http');
	
var app = http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write("hello Ujjwal");
	response.end();
}).listen(3333);

console.log("server is running");
