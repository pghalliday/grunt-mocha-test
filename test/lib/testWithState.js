var moduleWithState = require('./moduleWithState');
var expect = require('chai').expect;

describe('moduleWithState', function() {
  it('should have state "hello"', function() {
    expect(moduleWithState.state).to.equal('hello');
    moduleWithState.state = 'goodbye';
  });
});