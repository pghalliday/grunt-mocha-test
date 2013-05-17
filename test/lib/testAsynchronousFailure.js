var expect = require('chai').expect;

describe('Asynchronous test', function() {
  it('should fail', function(done) {
    process.nextTick(function () {
      expect(true).to.equal(false);
      done();
    });
  });
});