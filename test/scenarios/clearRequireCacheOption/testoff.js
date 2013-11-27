var expect = require('chai').expect;
var path = require('path');

describe('check content of require cache contain tasks/mocha.js', function() {
  it('should pass', function() {
    expect(require.cache).to.have.property(path.resolve(__dirname, '../../../tasks/mocha.js'));
  });
});
