var static = require('node-static');

//
// Create a node-static server instance to serve the './public' folder
//
var file = new static.Server();
var port = process.env.PORT || 8080;

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(port);
