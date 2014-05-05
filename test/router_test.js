var assert = require('assert'),
    Router = require('../lib/router').Router;

var noop = function() {};

describe('Router', function() {
  beforeEach(function() {
    this.router = new Router();
  });

  it('stores routes', function() {
    this.router.route('GET', '/', noop);
    this.router.route('POST', '/tweets', noop);

    assert.deepEqual(this.router.routes, {
      GET: [
        {
          regexp: new RegExp('^/$', 'i'),
          callback: noop
        }
      ],
      POST: [
        {
          regexp: new RegExp('^/tweets$', 'i'),
          callback: noop
        }
      ]
    });
  });

  it('handles GET', function() {
    var called = false;

    this.router.route('GET', '/hi', function() { called = true; });

    this.router.handle({ method: 'GET', url: '/hi' }, {});

    assert(called, 'Should call GET route');
  });

  it('handles POST', function() {
    var getCalled, postCalled;

    this.router.route('GET', '/', function() { getCalled = true });
    this.router.route('POST', '/', function() { postCalled = true });

    this.router.handle({ method: 'POST', url: '/', }, {});

    assert(!getCalled, 'Shouldn\'t call get route');
    assert(postCalled, 'Should call post route');
  });

  it('handles all', function() {
    var calledCount = 0;

    this.router.all('/', function() { calledCount += 1; });

    this.router.handle({ method: 'GET', url: '/', }, {});
    this.router.handle({ method: 'POST', url: '/', }, {});

    assert.equal(calledCount, 2);
  });

  it('handle not found', function() {
    var self = this;

    assert.throws(function() {
      self.router.handle({ method: 'GET', url: '/' }, {});
    }, function(err) {
      return err.status === 404;
    }, 'Should throw 404 error');
  });
});

