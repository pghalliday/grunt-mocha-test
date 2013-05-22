if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['test/scenarios/asyncRequireFailure/test.js'] === 'undefined'){_$jscoverage['test/scenarios/asyncRequireFailure/test.js']=[];
_$jscoverage['test/scenarios/asyncRequireFailure/test.js'].source=['var doesNotExist;',
'process.nextTick(function() {',
'  doesNotExist = require(\'doesNotExist\');',
'});',
'',
'var waitForDoesNotExist = function(callback) {',
'  if (doesNotExist) {',
'    callback();',
'  } else {',
'    process.nextTick(function() {',
'      waitForDoesNotExist(callback);',
'    });',
'  }',
'};',
'',
'describe(\'test\', function() {',
'  it(\'should fail\', function(done) {',
'    waitForDoesNotExist(done);',
'  });',
'});'];
_$jscoverage['test/scenarios/asyncRequireFailure/test.js'][10]=0;
_$jscoverage['test/scenarios/asyncRequireFailure/test.js'][1]=0;
_$jscoverage['test/scenarios/asyncRequireFailure/test.js'][2]=0;
_$jscoverage['test/scenarios/asyncRequireFailure/test.js'][3]=0;
_$jscoverage['test/scenarios/asyncRequireFailure/test.js'][6]=0;
_$jscoverage['test/scenarios/asyncRequireFailure/test.js'][7]=0;
_$jscoverage['test/scenarios/asyncRequireFailure/test.js'][8]=0;
_$jscoverage['test/scenarios/asyncRequireFailure/test.js'][11]=0;
_$jscoverage['test/scenarios/asyncRequireFailure/test.js'][16]=0;
_$jscoverage['test/scenarios/asyncRequireFailure/test.js'][17]=0;
_$jscoverage['test/scenarios/asyncRequireFailure/test.js'][18]=0;
}_$jscoverage['test/scenarios/asyncRequireFailure/test.js'][1]++;
var doesNotExist;
_$jscoverage['test/scenarios/asyncRequireFailure/test.js'][2]++;
process.nextTick(function() {
  _$jscoverage['test/scenarios/asyncRequireFailure/test.js'][3]++;
doesNotExist = require('doesNotExist');
});

_$jscoverage['test/scenarios/asyncRequireFailure/test.js'][6]++;
var waitForDoesNotExist = function(callback) {
  _$jscoverage['test/scenarios/asyncRequireFailure/test.js'][7]++;
if (doesNotExist) {
    _$jscoverage['test/scenarios/asyncRequireFailure/test.js'][8]++;
callback();
  } else {
    _$jscoverage['test/scenarios/asyncRequireFailure/test.js'][10]++;
process.nextTick(function() {
      _$jscoverage['test/scenarios/asyncRequireFailure/test.js'][11]++;
waitForDoesNotExist(callback);
    });
  }
};

_$jscoverage['test/scenarios/asyncRequireFailure/test.js'][16]++;
describe('test', function() {
  _$jscoverage['test/scenarios/asyncRequireFailure/test.js'][17]++;
it('should fail', function(done) {
    _$jscoverage['test/scenarios/asyncRequireFailure/test.js'][18]++;
waitForDoesNotExist(done);
  });
});