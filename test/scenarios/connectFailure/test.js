var expect = require('chai').expect;
var net = require('net');

describe('Connection test', function() {
  it('should fail', function(done) {
    net.connect({
      port: 10000,
      host: 'doesnotexist'
    }, function () {
      done();
    });
  });
});