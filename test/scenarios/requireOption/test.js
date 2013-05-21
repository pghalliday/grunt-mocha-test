/*global testVar:false*/

var expect = require('chai').expect;

describe('test', function() {
  it('should fail', function() {
    expect(testVar).to.equal('hello');
  });
});