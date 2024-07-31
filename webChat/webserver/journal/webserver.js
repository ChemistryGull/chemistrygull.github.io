var http = require("http").createServer(handler);
var fs = require("fs")
var url = require('url');
var path = require('path');
var io = require('socket.io','net')(http);

const WebPort = 80;

http.listen(WebPort, function() {  // This gets call when the web server is first started.
  console.log('~webserver.js~: Server running on Port '+WebPort);
});


function handler(request, response) {
  // console.log('~webserver.js~: ---NEW HTTP HANDLER CALLED');
  var q = url.parse(request.url, true);
  var filename = "." + q.pathname;
  // console.log('~webserver.js~: filename = ' + filename);
  var extname = path.extname(filename);
  if (filename=='./') {
    // console.log('~webserver.js~: retrieving default index.html file');
    filename= './index.html';
  }

  // Initial content type
  var contentType = 'text/html';

  // Check ext and set content type
  switch(extname) {
  	case '.js':
  	    contentType = 'text/javascript';
  	    break;
  	case '.css':
  	    contentType = 'text/css';
  	    break;
  	case '.json':
  	    contentType = 'application/json';
  	    break;
  	case '.png':
  	    contentType = 'image/png';
  	    break;
  	case '.jpg':
  	    contentType = 'image/jpg';
  	    break;
  	case '.ico':
  	    contentType = 'image/png';
  	    break;
  }



  fs.readFile(__dirname + '/site/' + filename, function(err, content) {
  	if(err) {
      console.log('File not found. Filename='+filename);
      fs.readFile(__dirname + '/site/404.html', function(err, content) {
    		response.writeHead(200, {'Content-Type': 'text/html'});
    		return response.end(content,'utf8'); //display 404 on error
  	  });
  	}
  	else {
  	    // Success
  	    response.writeHead(200, {'Content-Type': contentType});
  	    return response.end(content,'utf8');
  	}
  });
}

io.on("connection", socket => {
  console.log(socket.id);

  socket.on("send-msg", msg => {
    console.log(socket.id + " sent " + JSON.stringify(msg));
    msg.sentFromServer = true;
    msg.time = Date.now();
    msg.er = "sus";
    io.emit("recieve-msg", msg)
  })
})
