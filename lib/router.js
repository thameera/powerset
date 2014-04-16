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

