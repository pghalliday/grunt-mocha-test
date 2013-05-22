if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['test/scenarios/testFailure/test.js'] === 'undefined'){_$jscoverage['test/scenarios/testFailure/test.js']=[];
_$jscoverage['test/scenarios/testFailure/test.js'].source=['var expect = require(\'chai\').expect;',
'',
'describe(\'test\', function() {',
'  it(\'should fail\', function() {',
'    expect(true).to.equal(false);',
'  });',
'});'];
_$jscoverage['test/scenarios/testFailure/test.js'][1]=0;
_$jscoverage['test/scenarios/testFailure/test.js'][3]=0;
_$jscoverage['test/scenarios/testFailure/test.js'][4]=0;
_$jscoverage['test/scenarios/testFailure/test.js'][5]=0;
}_$jscoverage['test/scenarios/testFailure/test.js'][1]++;
var expect = require('chai').expect;

_$jscoverage['test/scenarios/testFailure/test.js'][3]++;
describe('test', function() {
  _$jscoverage['test/scenarios/testFailure/test.js'][4]++;
it('should fail', function() {
    _$jscoverage['test/scenarios/testFailure/test.js'][5]++;
expect(true).to.equal(false);
  });
});