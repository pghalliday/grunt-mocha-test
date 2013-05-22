if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['test/scenarios/ignoreLeaksOption/test.js'] === 'undefined'){_$jscoverage['test/scenarios/ignoreLeaksOption/test.js']=[];
_$jscoverage['test/scenarios/ignoreLeaksOption/test.js'].source=['/*global leak:true*/',
'',
'describe(\'test\', function() {',
'  it(\'should leak\', function() {',
'    leak = \'this is a leak\';',
'  });',
'});',
''];
_$jscoverage['test/scenarios/ignoreLeaksOption/test.js'][3]=0;
_$jscoverage['test/scenarios/ignoreLeaksOption/test.js'][4]=0;
_$jscoverage['test/scenarios/ignoreLeaksOption/test.js'][5]=0;
}/*global leak:true*/

_$jscoverage['test/scenarios/ignoreLeaksOption/test.js'][3]++;
describe('test', function() {
  _$jscoverage['test/scenarios/ignoreLeaksOption/test.js'][4]++;
it('should leak', function() {
    _$jscoverage['test/scenarios/ignoreLeaksOption/test.js'][5]++;
leak = 'this is a leak';
  });
});
