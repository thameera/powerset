var _ = require('lodash');

var Router = function() {
  this.routes = {};
};

exports.Router = Router;

Router.prototype.route = function(method, url, callback) {
  method = method.toUpperCase();
  var routes = this.routes[method] = this.routes[method] || [];

  routes.push({
    regexp: new RegExp('^' + url + '$', 'i'),
    callback: callback
  });
};

Router.prototype.all = function(url, callback) {
  this.route('_', url, callback);
};

Router.prototype.handle = function(req, res) {
  var routes = this.routes[req.method] || [];
  routes = routes.concat(this.routes._ || []);

  var route = _.find(routes, function(r) {
    return req.url.match(r.regexp);
  });

  if (route) {
    route.callback(req, res);
  } else {
    var err = new Error('Not found');
    err.status = 404;
    throw err;
  }
};

