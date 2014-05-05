var assert = require('assert'),
    App = require('../lib/app').App,
    Response = require('../lib/response').Response;

describe('App', function() {
  beforeEach('App', function() {
    this.app = new App();
  });
  
  it('handles GET', function() {
    var called;

    this.app.get('/', function() { called = true; });

    this.app.handle({ method: 'GET', url: '/' }, {});

    assert(called);
  });

  it('res has a send method', function() {
    var res;

    this.app.get('/', function(_req, _res) { res = _res; });

    this.app.handle({ method: 'GET', url: '/' }, {});

    assert(res.send);
  });

  it('error is caught', function() {
    var err = new Error('Ouch');
    err.status = 500;

    this.app.get('/', function() { throw err; });

    var status, body;
    this.app.handle({ method: 'GET', url: '/' },
      {
        send: function(_status, _body) {
          status = _status;
          body = _body;
        }
      });

    assert.equal(status, err.status);
    assert.equal(body, err.message);
  });
});

