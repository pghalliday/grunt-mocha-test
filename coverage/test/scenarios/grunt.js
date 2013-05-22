if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['test/scenarios/grunt.js'] === 'undefined'){_$jscoverage['test/scenarios/grunt.js']=[];
_$jscoverage['test/scenarios/grunt.js'].source=['var grunt = require(\'grunt\');',
'grunt.cli();',
'',
'// send coverage data to stdout if it exists',
'// this is because the coverage tool does not',
'// really work with child processes so we are',
'// giving it a helping hand',
'if (global._$jscoverage) {',
'  // we have to create our own structure as the _$jscoverage',
'  // structure does not stringify to JSON fully as it skips',
'  // the source property that is added to the array',
'  var data = {',
'    sourceArrays: {},',
'    callCounts: {}',
'  };',
'  var src = global._$jscoverage;',
'  for (var filename in src) {',
'    var sourceArray = data.sourceArrays[filename] = src[filename].source;',
'    var callCounts = data.callCounts[filename] = src[filename];',
'  }',
'  console.log(\'##jscoverage##\' + JSON.stringify(data));',
'}',
''];
_$jscoverage['test/scenarios/grunt.js'][1]=0;
_$jscoverage['test/scenarios/grunt.js'][2]=0;
_$jscoverage['test/scenarios/grunt.js'][8]=0;
_$jscoverage['test/scenarios/grunt.js'][12]=0;
_$jscoverage['test/scenarios/grunt.js'][16]=0;
_$jscoverage['test/scenarios/grunt.js'][17]=0;
_$jscoverage['test/scenarios/grunt.js'][18]=0;
_$jscoverage['test/scenarios/grunt.js'][19]=0;
_$jscoverage['test/scenarios/grunt.js'][21]=0;
}_$jscoverage['test/scenarios/grunt.js'][1]++;
var grunt = require('grunt');
_$jscoverage['test/scenarios/grunt.js'][2]++;
grunt.cli();

// send coverage data to stdout if it exists
// this is because the coverage tool does not
// really work with child processes so we are
// giving it a helping hand
_$jscoverage['test/scenarios/grunt.js'][8]++;
if (global._$jscoverage) {
  // we have to create our own structure as the _$jscoverage
  // structure does not stringify to JSON fully as it skips
  // the source property that is added to the array
  _$jscoverage['test/scenarios/grunt.js'][12]++;
var data = {
    sourceArrays: {},
    callCounts: {}
  };
  _$jscoverage['test/scenarios/grunt.js'][16]++;
var src = global._$jscoverage;
  _$jscoverage['test/scenarios/grunt.js'][17]++;
for (var filename in src) {
    _$jscoverage['test/scenarios/grunt.js'][18]++;
var sourceArray = data.sourceArrays[filename] = src[filename].source;
    _$jscoverage['test/scenarios/grunt.js'][19]++;
var callCounts = data.callCounts[filename] = src[filename];
  }
  _$jscoverage['test/scenarios/grunt.js'][21]++;
console.log('##jscoverage##' + JSON.stringify(data));
}
