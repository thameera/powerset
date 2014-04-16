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
});

