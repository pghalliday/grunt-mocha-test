expect = require('chai').expect
Test = require './lib'

describe 'test coffee-script', =>
  it 'should pass', =>
    test = new Test 'Peter'
    expect(test.sayHello()).to.equal 'Hello, Peter'
    expect(testVar).to.equal 'test'
