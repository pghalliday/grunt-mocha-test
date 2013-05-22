if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['test/scenarios/requireOption/test.js'] === 'undefined'){_$jscoverage['test/scenarios/requireOption/test.js']=[];
_$jscoverage['test/scenarios/requireOption/test.js'].source=['/*global testVar:false*/',
'',
'var expect = require(\'chai\').expect;',
'',
'describe(\'test\', function() {',
'  it(\'should fail\', function() {',
'    expect(testVar).to.equal(\'hello\');',
'  });',
'});'];
_$jscoverage['test/scenarios/requireOption/test.js'][3]=0;
_$jscoverage['test/scenarios/requireOption/test.js'][5]=0;
_$jscoverage['test/scenarios/requireOption/test.js'][6]=0;
_$jscoverage['test/scenarios/requireOption/test.js'][7]=0;
}/*global testVar:false*/

_$jscoverage['test/scenarios/requireOption/test.js'][3]++;
var expect = require('chai').expect;

_$jscoverage['test/scenarios/requireOption/test.js'][5]++;
describe('test', function() {
  _$jscoverage['test/scenarios/requireOption/test.js'][6]++;
it('should fail', function() {
    _$jscoverage['test/scenarios/requireOption/test.js'][7]++;
expect(testVar).to.equal('hello');
  });
});