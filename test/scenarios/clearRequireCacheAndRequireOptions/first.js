/*global testVar:true*/

var expect = require('chai').expect;

describe('test', function() {
  it('should pass', function() {
    expect(testVar).to.equal('hello');
  });
  it('should also pass', function() {
    testVar = 'goodbye';
    expect(testVar).to.equal('goodbye');
  });
});
