/* global singleton:false */

var expect = require('chai').expect;

describe('test2', function() {
  it('should pass', function () {
    var hello = singleton.getInstance('hello');
    expect(hello.world).to.equal('world');
  });
});
