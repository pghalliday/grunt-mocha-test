var expect = require('chai').expect;
var path = require('path');

describe('check content of require cache does not contain tasks/mocha.js', function() {
  it('should pass', function() {
    expect(require.cache).not.to.have.property(path.resolve(__dirname, '../../../tasks/mocha.js'));
  });
});
