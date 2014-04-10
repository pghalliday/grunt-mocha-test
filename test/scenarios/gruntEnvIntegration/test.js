var expect = require('chai').expect;

describe('test', function() {
  it('should be ok', function() {
    expect(process.env.TEST).to.equal('this is a test');
  });
});