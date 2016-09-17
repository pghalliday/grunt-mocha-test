/*global testVar:false*/

var expect = require('chai').expect;

describe('test', function() {
  it('should pass', function() {
    expect(testVar).to.equal('hello');
  });
});