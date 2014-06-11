/* global singleton:false */

var expect = require('chai').expect;

describe('test1', function() {
  before(function () {
    var hello = singleton.getInstance('hello');
    hello.world = 'world';
  });
  
  it('should pass', function () {
    var hello = singleton.getInstance('hello');
    expect(hello.world).to.equal('world');
  });
});
