var expect = require('chai').expect;

describe('test', function() {
  it('should timeout', function(done) {
    setTimeout(function() {
      done();
    }, 1000);
  });
});