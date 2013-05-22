if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['test/scenarios/asyncTestFailure/test.js'] === 'undefined'){_$jscoverage['test/scenarios/asyncTestFailure/test.js']=[];
_$jscoverage['test/scenarios/asyncTestFailure/test.js'].source=['var expect = require(\'chai\').expect;',
'',
'describe(\'Asynchronous test\', function() {',
'  it(\'should fail\', function(done) {',
'    process.nextTick(function () {',
'      expect(true).to.equal(false);',
'      done();',
'    });',
'  });',
'});'];
_$jscoverage['test/scenarios/asyncTestFailure/test.js'][1]=0;
_$jscoverage['test/scenarios/asyncTestFailure/test.js'][3]=0;
_$jscoverage['test/scenarios/asyncTestFailure/test.js'][4]=0;
_$jscoverage['test/scenarios/asyncTestFailure/test.js'][5]=0;
_$jscoverage['test/scenarios/asyncTestFailure/test.js'][6]=0;
_$jscoverage['test/scenarios/asyncTestFailure/test.js'][7]=0;
}_$jscoverage['test/scenarios/asyncTestFailure/test.js'][1]++;
var expect = require('chai').expect;

_$jscoverage['test/scenarios/asyncTestFailure/test.js'][3]++;
describe('Asynchronous test', function() {
  _$jscoverage['test/scenarios/asyncTestFailure/test.js'][4]++;
it('should fail', function(done) {
    _$jscoverage['test/scenarios/asyncTestFailure/test.js'][5]++;
process.nextTick(function () {
      _$jscoverage['test/scenarios/asyncTestFailure/test.js'][6]++;
expect(true).to.equal(false);
      _$jscoverage['test/scenarios/asyncTestFailure/test.js'][7]++;
done();
    });
  });
});