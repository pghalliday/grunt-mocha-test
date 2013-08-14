/*global testVar1:false, testVar2:false, testVar3:false*/

var expect = require('chai').expect;

describe('test', function() {
  it('should pass', function() {
    expect(testVar1).to.equal('hello');
    expect(testVar2).to.equal('world');
    expect(testVar3).to.equal('!');
  });
});