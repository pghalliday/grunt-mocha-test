if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['test/tasks/grunt-mocha-test.js'] === 'undefined'){_$jscoverage['test/tasks/grunt-mocha-test.js']=[];
_$jscoverage['test/tasks/grunt-mocha-test.js'].source=['/*jshint loopfunc: true */',
'',
'var expect = require(\'chai\').expect;',
'var exec = require(\'child_process\').exec;',
'',
'var mergeCoverageData = function(data) {',
'  // we have to reconstruct the the _$jscoverage data',
'  // format as it cannot be stringified to JSON with',
'  // the additional source property added to arrays',
'  var jscoverage = global._$jscoverage;',
'  var sourceArrays = data.sourceArrays;',
'  var callCounts = data.callCounts;',
'  if (jscoverage) {',
'    for (var filename in sourceArrays) {',
'      var dest = jscoverage[filename];',
'      var src = callCounts[filename];',
'      src.source = sourceArrays[filename];',
'      if (typeof dest === \'undefined\') {',
'        jscoverage[filename] = src;',
'      } else {',
'        src.forEach(function(count, index) {',
'          if (count !== null) {',
'            dest[index] += count;',
'          }',
'        });',
'      }',
'    }',
'  }',
'};',
'',
'var execScenario = function(scenario, callback) {',
'  var child = exec(\'node ../grunt.js\', {cwd: __dirname + \'/../scenarios/\' + scenario}, function(error, stdout, stderr) {',
'    // collect coverage data from stdout if it exists',
'    // this is because the coverage tool does not',
'    // really work with child processes so we are',
'    // giving it a helping hand',
'    var jscoverage = stdout.match(/##jscoverage##(.+)/);',
'    if (jscoverage) {',
'      mergeCoverageData(JSON.parse(jscoverage[1]));',
'    }',
'    callback(error, stdout, stderr);',
'  });',
'};',
'',
'describe(\'grunt-mocha-test\', function() {',
'  it(\'should run tests from the supplied files\', function(done) {',
'    execScenario(\'tests\', function(error, stdout, stderr) {',
'      expect(stdout).to.match(/test1/);',
'      expect(stdout).to.match(/test2/);',
'      expect(stdout).to.match(/2 tests complete/);',
'      expect(stdout).to.match(/Done, without errors./);',
'      expect(stderr).to.equal(\'\');',
'      done();',
'    });',
'  });',
'',
'  it(\'should report the number of test failures and exit grunt with an error on failed tests\', function(done) {',
'    execScenario(\'testFailure\', function(error, stdout, stderr) {',
'      expect(stdout).to.match(/test/);',
'      expect(stdout).to.match(/Aborted due to warnings./);',
'      expect(stderr).to.match(/1 of 1 test failed/);',
'      done();',
'    });',
'  });',
'',
'  it(\'should cleanly catch asynchronous test failures so that grunt does not exit early\', function(done) {',
'    execScenario(\'asyncTestFailure\', function(error, stdout, stderr) {',
'      expect(stdout).to.match(/Asynchronous test/);',
'      expect(stdout).to.match(/Aborted due to warnings./);',
'      expect(stderr).to.match(/1 of 1 test failed/);',
'      done();',
'    });',
'  });',
'',
'  it(\'should cleanly catch and log require exceptions thrown synchronously by Mocha so that grunt does not exit early\', function(done) {',
'    execScenario(\'requireFailure\', function(error, stdout, stderr) {',
'      expect(stdout).to.match(/Cannot find module \'doesNotExist/);',
'      expect(stdout).to.match(/test.js/);',
'      expect(stdout).to.match(/Aborted due to warnings./);',
'      expect(stderr).to.equal(\'\');',
'      done();',
'    });',
'  });',
'',
'  it(\'should cleanly catch and log require exceptions thrown asynchronously by Mocha so that grunt does not exit early\', function(done) {',
'    execScenario(\'asyncRequireFailure\', function(error, stdout, stderr) {',
'      expect(stdout).to.match(/Cannot find module \'doesNotExist/);',
'      expect(stdout).to.match(/test.js/);',
'      expect(stdout).to.match(/Aborted due to warnings./);',
'      expect(stderr).to.equal(\'\');',
'      done();',
'    });',
'  });',
'',
'  it(\'should support the require option\', function(done) {',
'    execScenario(\'requireOption\', function(error, stdout, stderr) {',
'      expect(stdout).to.match(/test/);',
'      expect(stdout).to.match(/1 test complete/);',
'      expect(stdout).to.match(/Done, without errors./);',
'      expect(stderr).to.equal(\'\');',
'      done();',
'    });',
'  });',
'',
'  it(\'should support the grep option\', function(done) {',
'    execScenario(\'grepOption\', function(error, stdout, stderr) {',
'      expect(stdout).to.match(/tests that match grep/);',
'      expect(stdout).to.match(/1 test complete/);',
'      expect(stdout).to.match(/Done, without errors./);',
'      expect(stderr).to.equal(\'\');',
'      done();',
'    });',
'  });',
'',
'  it(\'should support the invert option\', function(done) {',
'    execScenario(\'invertOption\', function(error, stdout, stderr) {',
'      expect(stdout).to.match(/tests that don\'t match grep/);',
'      expect(stdout).to.match(/1 test complete/);',
'      expect(stdout).to.match(/Done, without errors./);',
'      expect(stderr).to.equal(\'\');',
'      done();',
'    });',
'  });',
'',
'  it(\'should support the ignoreLeaks option\', function(done) {',
'    execScenario(\'ignoreLeaksOption\', function(error, stdout, stderr) {',
'      expect(stdout).to.match(/test/);',
'      expect(stdout).to.match(/Aborted due to warnings./);',
'      expect(stderr).to.match(/1 of 1 test failed/);',
'      expect(stderr).to.match(/Error: global leak detected: leak/);',
'      done();',
'    });',
'  });',
'',
'  it(\'should support the globals option\', function(done) {',
'    execScenario(\'globalsOption\', function(error, stdout, stderr) {',
'      expect(stdout).to.match(/test/);',
'      expect(stdout).to.match(/1 test complete/);',
'      expect(stdout).to.match(/Done, without errors./);',
'      expect(stderr).to.equal(\'\');',
'      done();',
'    });',
'  });',
'',
'  it(\'should support the asyncOnly option\', function(done) {',
'    execScenario(\'asyncOnlyOption\', function(error, stdout, stderr) {',
'      expect(stdout).to.match(/test/);',
'      expect(stdout).to.match(/Aborted due to warnings./);',
'      expect(stderr).to.match(/1 of 1 test failed/);',
'      expect(stderr).to.match(/Error: --async-only option in use without declaring/);',
'      done();',
'    });',
'  });',
'',
'  it(\'should support the reporter option\', function(done) {',
'    execScenario(\'reporterOption\', function(error, stdout, stderr) {',
'      expect(stdout).to.match(/<section class="suite">/);',
'      expect(stderr).to.equal(\'\');',
'      done();',
'    });',
'  });',
'',
'  it(\'should support the ui option\', function(done) {',
'    execScenario(\'uiOption\', function(error, stdout, stderr) {',
'      expect(stdout).to.match(/test1/);',
'      expect(stdout).to.match(/test2/);',
'      expect(stdout).to.match(/2 tests complete/);',
'      expect(stdout).to.match(/Done, without errors./);',
'      expect(stderr).to.equal(\'\');',
'      done();',
'    });',
'  });',
'',
'  it(\'should support the timeout option\', function(done) {',
'    execScenario(\'timeoutOption\', function(error, stdout, stderr) {',
'      expect(stdout).to.match(/test/);',
'      expect(stdout).to.match(/Aborted due to warnings./);',
'      expect(stderr).to.match(/1 of 1 test failed/);',
'      expect(stderr).to.match(/Error: timeout of 500ms exceeded/);',
'      done();',
'    });',
'  });',
'',
'  it(\'should support the growl option\', function(done) {',
'    execScenario(\'growlOption\', function(error, stdout, stderr) { ',
'      // TODO: Let\'s just test that everything completed successfully',
'      // as there\'s no way of knowing if growl was actually called for now.',
'      // A possible option would be to mock the growl binaries in the ',
'      // growlOption scenario directory and have them do something that',
'      // the test can detect (HTTP server/request?). This would have to',
'      // be done for each platform though.',
'      expect(stdout).to.match(/test1/);',
'      expect(stdout).to.match(/test2/);',
'      expect(stdout).to.match(/2 tests complete/);',
'      expect(stdout).to.match(/Done, without errors./);',
'      expect(stderr).to.equal(\'\');',
'      done();',
'    });',
'  });',
'',
'  it(\'should support a destination file to write output\');',
'});'];
_$jscoverage['test/tasks/grunt-mocha-test.js'][108]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][3]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][109]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][10]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][4]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][6]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][111]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][16]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][11]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][12]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][15]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][13]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][14]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][117]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][18]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][17]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][119]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][37]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][21]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][22]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][32]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][31]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][19]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][23]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][115]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][45]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][39]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][38]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][41]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][128]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][46]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][129]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][50]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][47]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][48]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][49]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][126]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][60]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][59]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][51]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][52]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][53]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][58]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][57]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][139]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][68]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][61]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][67]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][66]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][62]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][136]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][79]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][69]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][70]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][71]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][76]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][75]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][77]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][78]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][149]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][88]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][80]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][81]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][86]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][85]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][87]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][145]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][100]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][98]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][89]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][97]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][96]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][99]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][90]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][95]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][91]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][155]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][107]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][106]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][101]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][105]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][166]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][110]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][167]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][125]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][120]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][118]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][116]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][121]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][170]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][130]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][127]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][163]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][131]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][176]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][148]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][146]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][140]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][141]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][135]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][137]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][138]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][147]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][180]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][150]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][175]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][159]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][156]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][158]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][151]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][157]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][193]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][164]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][194]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][165]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][195]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][169]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][168]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][174]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][177]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][178]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][179]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][184]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][185]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][192]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][196]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][197]=0;
_$jscoverage['test/tasks/grunt-mocha-test.js'][201]=0;
}/*jshint loopfunc: true */

_$jscoverage['test/tasks/grunt-mocha-test.js'][3]++;
var expect = require('chai').expect;
_$jscoverage['test/tasks/grunt-mocha-test.js'][4]++;
var exec = require('child_process').exec;

_$jscoverage['test/tasks/grunt-mocha-test.js'][6]++;
var mergeCoverageData = function(data) {
  // we have to reconstruct the the _$jscoverage data
  // format as it cannot be stringified to JSON with
  // the additional source property added to arrays
  _$jscoverage['test/tasks/grunt-mocha-test.js'][10]++;
var jscoverage = global._$jscoverage;
  _$jscoverage['test/tasks/grunt-mocha-test.js'][11]++;
var sourceArrays = data.sourceArrays;
  _$jscoverage['test/tasks/grunt-mocha-test.js'][12]++;
var callCounts = data.callCounts;
  _$jscoverage['test/tasks/grunt-mocha-test.js'][13]++;
if (jscoverage) {
    _$jscoverage['test/tasks/grunt-mocha-test.js'][14]++;
for (var filename in sourceArrays) {
      _$jscoverage['test/tasks/grunt-mocha-test.js'][15]++;
var dest = jscoverage[filename];
      _$jscoverage['test/tasks/grunt-mocha-test.js'][16]++;
var src = callCounts[filename];
      _$jscoverage['test/tasks/grunt-mocha-test.js'][17]++;
src.source = sourceArrays[filename];
      _$jscoverage['test/tasks/grunt-mocha-test.js'][18]++;
if (typeof dest === 'undefined') {
        _$jscoverage['test/tasks/grunt-mocha-test.js'][19]++;
jscoverage[filename] = src;
      } else {
        _$jscoverage['test/tasks/grunt-mocha-test.js'][21]++;
src.forEach(function(count, index) {
          _$jscoverage['test/tasks/grunt-mocha-test.js'][22]++;
if (count !== null) {
            _$jscoverage['test/tasks/grunt-mocha-test.js'][23]++;
dest[index] += count;
          }
        });
      }
    }
  }
};

_$jscoverage['test/tasks/grunt-mocha-test.js'][31]++;
var execScenario = function(scenario, callback) {
  _$jscoverage['test/tasks/grunt-mocha-test.js'][32]++;
var child = exec('node ../grunt.js', {cwd: __dirname + '/../scenarios/' + scenario}, function(error, stdout, stderr) {
    // collect coverage data from stdout if it exists
    // this is because the coverage tool does not
    // really work with child processes so we are
    // giving it a helping hand
    _$jscoverage['test/tasks/grunt-mocha-test.js'][37]++;
var jscoverage = stdout.match(/##jscoverage##(.+)/);
    _$jscoverage['test/tasks/grunt-mocha-test.js'][38]++;
if (jscoverage) {
      _$jscoverage['test/tasks/grunt-mocha-test.js'][39]++;
mergeCoverageData(JSON.parse(jscoverage[1]));
    }
    _$jscoverage['test/tasks/grunt-mocha-test.js'][41]++;
callback(error, stdout, stderr);
  });
};

_$jscoverage['test/tasks/grunt-mocha-test.js'][45]++;
describe('grunt-mocha-test', function() {
  _$jscoverage['test/tasks/grunt-mocha-test.js'][46]++;
it('should run tests from the supplied files', function(done) {
    _$jscoverage['test/tasks/grunt-mocha-test.js'][47]++;
execScenario('tests', function(error, stdout, stderr) {
      _$jscoverage['test/tasks/grunt-mocha-test.js'][48]++;
expect(stdout).to.match(/test1/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][49]++;
expect(stdout).to.match(/test2/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][50]++;
expect(stdout).to.match(/2 tests complete/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][51]++;
expect(stdout).to.match(/Done, without errors./);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][52]++;
expect(stderr).to.equal('');
      _$jscoverage['test/tasks/grunt-mocha-test.js'][53]++;
done();
    });
  });

  _$jscoverage['test/tasks/grunt-mocha-test.js'][57]++;
it('should report the number of test failures and exit grunt with an error on failed tests', function(done) {
    _$jscoverage['test/tasks/grunt-mocha-test.js'][58]++;
execScenario('testFailure', function(error, stdout, stderr) {
      _$jscoverage['test/tasks/grunt-mocha-test.js'][59]++;
expect(stdout).to.match(/test/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][60]++;
expect(stdout).to.match(/Aborted due to warnings./);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][61]++;
expect(stderr).to.match(/1 of 1 test failed/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][62]++;
done();
    });
  });

  _$jscoverage['test/tasks/grunt-mocha-test.js'][66]++;
it('should cleanly catch asynchronous test failures so that grunt does not exit early', function(done) {
    _$jscoverage['test/tasks/grunt-mocha-test.js'][67]++;
execScenario('asyncTestFailure', function(error, stdout, stderr) {
      _$jscoverage['test/tasks/grunt-mocha-test.js'][68]++;
expect(stdout).to.match(/Asynchronous test/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][69]++;
expect(stdout).to.match(/Aborted due to warnings./);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][70]++;
expect(stderr).to.match(/1 of 1 test failed/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][71]++;
done();
    });
  });

  _$jscoverage['test/tasks/grunt-mocha-test.js'][75]++;
it('should cleanly catch and log require exceptions thrown synchronously by Mocha so that grunt does not exit early', function(done) {
    _$jscoverage['test/tasks/grunt-mocha-test.js'][76]++;
execScenario('requireFailure', function(error, stdout, stderr) {
      _$jscoverage['test/tasks/grunt-mocha-test.js'][77]++;
expect(stdout).to.match(/Cannot find module 'doesNotExist/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][78]++;
expect(stdout).to.match(/test.js/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][79]++;
expect(stdout).to.match(/Aborted due to warnings./);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][80]++;
expect(stderr).to.equal('');
      _$jscoverage['test/tasks/grunt-mocha-test.js'][81]++;
done();
    });
  });

  _$jscoverage['test/tasks/grunt-mocha-test.js'][85]++;
it('should cleanly catch and log require exceptions thrown asynchronously by Mocha so that grunt does not exit early', function(done) {
    _$jscoverage['test/tasks/grunt-mocha-test.js'][86]++;
execScenario('asyncRequireFailure', function(error, stdout, stderr) {
      _$jscoverage['test/tasks/grunt-mocha-test.js'][87]++;
expect(stdout).to.match(/Cannot find module 'doesNotExist/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][88]++;
expect(stdout).to.match(/test.js/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][89]++;
expect(stdout).to.match(/Aborted due to warnings./);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][90]++;
expect(stderr).to.equal('');
      _$jscoverage['test/tasks/grunt-mocha-test.js'][91]++;
done();
    });
  });

  _$jscoverage['test/tasks/grunt-mocha-test.js'][95]++;
it('should support the require option', function(done) {
    _$jscoverage['test/tasks/grunt-mocha-test.js'][96]++;
execScenario('requireOption', function(error, stdout, stderr) {
      _$jscoverage['test/tasks/grunt-mocha-test.js'][97]++;
expect(stdout).to.match(/test/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][98]++;
expect(stdout).to.match(/1 test complete/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][99]++;
expect(stdout).to.match(/Done, without errors./);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][100]++;
expect(stderr).to.equal('');
      _$jscoverage['test/tasks/grunt-mocha-test.js'][101]++;
done();
    });
  });

  _$jscoverage['test/tasks/grunt-mocha-test.js'][105]++;
it('should support the grep option', function(done) {
    _$jscoverage['test/tasks/grunt-mocha-test.js'][106]++;
execScenario('grepOption', function(error, stdout, stderr) {
      _$jscoverage['test/tasks/grunt-mocha-test.js'][107]++;
expect(stdout).to.match(/tests that match grep/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][108]++;
expect(stdout).to.match(/1 test complete/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][109]++;
expect(stdout).to.match(/Done, without errors./);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][110]++;
expect(stderr).to.equal('');
      _$jscoverage['test/tasks/grunt-mocha-test.js'][111]++;
done();
    });
  });

  _$jscoverage['test/tasks/grunt-mocha-test.js'][115]++;
it('should support the invert option', function(done) {
    _$jscoverage['test/tasks/grunt-mocha-test.js'][116]++;
execScenario('invertOption', function(error, stdout, stderr) {
      _$jscoverage['test/tasks/grunt-mocha-test.js'][117]++;
expect(stdout).to.match(/tests that don't match grep/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][118]++;
expect(stdout).to.match(/1 test complete/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][119]++;
expect(stdout).to.match(/Done, without errors./);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][120]++;
expect(stderr).to.equal('');
      _$jscoverage['test/tasks/grunt-mocha-test.js'][121]++;
done();
    });
  });

  _$jscoverage['test/tasks/grunt-mocha-test.js'][125]++;
it('should support the ignoreLeaks option', function(done) {
    _$jscoverage['test/tasks/grunt-mocha-test.js'][126]++;
execScenario('ignoreLeaksOption', function(error, stdout, stderr) {
      _$jscoverage['test/tasks/grunt-mocha-test.js'][127]++;
expect(stdout).to.match(/test/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][128]++;
expect(stdout).to.match(/Aborted due to warnings./);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][129]++;
expect(stderr).to.match(/1 of 1 test failed/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][130]++;
expect(stderr).to.match(/Error: global leak detected: leak/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][131]++;
done();
    });
  });

  _$jscoverage['test/tasks/grunt-mocha-test.js'][135]++;
it('should support the globals option', function(done) {
    _$jscoverage['test/tasks/grunt-mocha-test.js'][136]++;
execScenario('globalsOption', function(error, stdout, stderr) {
      _$jscoverage['test/tasks/grunt-mocha-test.js'][137]++;
expect(stdout).to.match(/test/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][138]++;
expect(stdout).to.match(/1 test complete/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][139]++;
expect(stdout).to.match(/Done, without errors./);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][140]++;
expect(stderr).to.equal('');
      _$jscoverage['test/tasks/grunt-mocha-test.js'][141]++;
done();
    });
  });

  _$jscoverage['test/tasks/grunt-mocha-test.js'][145]++;
it('should support the asyncOnly option', function(done) {
    _$jscoverage['test/tasks/grunt-mocha-test.js'][146]++;
execScenario('asyncOnlyOption', function(error, stdout, stderr) {
      _$jscoverage['test/tasks/grunt-mocha-test.js'][147]++;
expect(stdout).to.match(/test/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][148]++;
expect(stdout).to.match(/Aborted due to warnings./);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][149]++;
expect(stderr).to.match(/1 of 1 test failed/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][150]++;
expect(stderr).to.match(/Error: --async-only option in use without declaring/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][151]++;
done();
    });
  });

  _$jscoverage['test/tasks/grunt-mocha-test.js'][155]++;
it('should support the reporter option', function(done) {
    _$jscoverage['test/tasks/grunt-mocha-test.js'][156]++;
execScenario('reporterOption', function(error, stdout, stderr) {
      _$jscoverage['test/tasks/grunt-mocha-test.js'][157]++;
expect(stdout).to.match(/<section class="suite">/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][158]++;
expect(stderr).to.equal('');
      _$jscoverage['test/tasks/grunt-mocha-test.js'][159]++;
done();
    });
  });

  _$jscoverage['test/tasks/grunt-mocha-test.js'][163]++;
it('should support the ui option', function(done) {
    _$jscoverage['test/tasks/grunt-mocha-test.js'][164]++;
execScenario('uiOption', function(error, stdout, stderr) {
      _$jscoverage['test/tasks/grunt-mocha-test.js'][165]++;
expect(stdout).to.match(/test1/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][166]++;
expect(stdout).to.match(/test2/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][167]++;
expect(stdout).to.match(/2 tests complete/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][168]++;
expect(stdout).to.match(/Done, without errors./);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][169]++;
expect(stderr).to.equal('');
      _$jscoverage['test/tasks/grunt-mocha-test.js'][170]++;
done();
    });
  });

  _$jscoverage['test/tasks/grunt-mocha-test.js'][174]++;
it('should support the timeout option', function(done) {
    _$jscoverage['test/tasks/grunt-mocha-test.js'][175]++;
execScenario('timeoutOption', function(error, stdout, stderr) {
      _$jscoverage['test/tasks/grunt-mocha-test.js'][176]++;
expect(stdout).to.match(/test/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][177]++;
expect(stdout).to.match(/Aborted due to warnings./);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][178]++;
expect(stderr).to.match(/1 of 1 test failed/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][179]++;
expect(stderr).to.match(/Error: timeout of 500ms exceeded/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][180]++;
done();
    });
  });

  _$jscoverage['test/tasks/grunt-mocha-test.js'][184]++;
it('should support the growl option', function(done) {
    _$jscoverage['test/tasks/grunt-mocha-test.js'][185]++;
execScenario('growlOption', function(error, stdout, stderr) { 
      // TODO: Let's just test that everything completed successfully
      // as there's no way of knowing if growl was actually called for now.
      // A possible option would be to mock the growl binaries in the 
      // growlOption scenario directory and have them do something that
      // the test can detect (HTTP server/request?). This would have to
      // be done for each platform though.
      _$jscoverage['test/tasks/grunt-mocha-test.js'][192]++;
expect(stdout).to.match(/test1/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][193]++;
expect(stdout).to.match(/test2/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][194]++;
expect(stdout).to.match(/2 tests complete/);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][195]++;
expect(stdout).to.match(/Done, without errors./);
      _$jscoverage['test/tasks/grunt-mocha-test.js'][196]++;
expect(stderr).to.equal('');
      _$jscoverage['test/tasks/grunt-mocha-test.js'][197]++;
done();
    });
  });

  _$jscoverage['test/tasks/grunt-mocha-test.js'][201]++;
it('should support a destination file to write output');
});