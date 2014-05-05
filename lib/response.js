var http = require('http');

var Response = function() {};

Response.prototype = Object.create(http.ServerResponse.prototype);
Response.prototype.constructor = Response;
exports.Response = Response;

// Default content-type: HTML
Response.prototype.contentType = 'text/html';

/*
 * Helper to send a response
 * USAGE: 
 *  res.send('body');
 *  res.send(404, 'Not found');
 */
Response.prototype.send = function(status, body) {
  if (!body) {
    body = status;
    status = 200;
  }

  this.writeHead(status, {
    'Content-Length': body.length,
    'Content-Type': this.contentType
  });

  this.end(body);
};

