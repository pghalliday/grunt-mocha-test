if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['test/scenarios/timeoutOption/test.js'] === 'undefined'){_$jscoverage['test/scenarios/timeoutOption/test.js']=[];
_$jscoverage['test/scenarios/timeoutOption/test.js'].source=['var expect = require(\'chai\').expect;',
'',
'describe(\'test\', function() {',
'  it(\'should timeout\', function(done) {',
'    setTimeout(function() {',
'      done();',
'    }, 1000);',
'  });',
'});'];
_$jscoverage['test/scenarios/timeoutOption/test.js'][1]=0;
_$jscoverage['test/scenarios/timeoutOption/test.js'][3]=0;
_$jscoverage['test/scenarios/timeoutOption/test.js'][4]=0;
_$jscoverage['test/scenarios/timeoutOption/test.js'][5]=0;
_$jscoverage['test/scenarios/timeoutOption/test.js'][6]=0;
}_$jscoverage['test/scenarios/timeoutOption/test.js'][1]++;
var expect = require('chai').expect;

_$jscoverage['test/scenarios/timeoutOption/test.js'][3]++;
describe('test', function() {
  _$jscoverage['test/scenarios/timeoutOption/test.js'][4]++;
it('should timeout', function(done) {
    _$jscoverage['test/scenarios/timeoutOption/test.js'][5]++;
setTimeout(function() {
      _$jscoverage['test/scenarios/timeoutOption/test.js'][6]++;
done();
    }, 1000);
  });
});