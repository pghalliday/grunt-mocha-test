if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['tasks/lib/MochaWrapper.js'] === 'undefined'){_$jscoverage['tasks/lib/MochaWrapper.js']=[];
_$jscoverage['tasks/lib/MochaWrapper.js'].source=['var Mocha = require(\'mocha\');',
'var domain = require(\'domain\');',
'',
'function MochaWrapper(params) {',
'  var mocha = new Mocha(params.options);',
'  params.files.forEach(mocha.addFile.bind(mocha));',
'',
'  this.run = function(callback) {',
'    // This init domain will catch asynchronous (uncaught) exceptions',
'    // thrown as a result of loading the test files, this is fine as',
'    // long as the tests have not already completed successfully before',
'    // the exception is thrown (which probably would not make sense anyway).',
'    // In such cases the exception will be reported but grunt will also report',
'    // "Done, without errors."',
'    var initDomain = domain.create();',
'    initDomain.on(\'error\', callback);',
'    initDomain.run(function() {',
'      try {',
'        // This hack is a copy of the hack used in',
'        // https://github.com/gregrperkins/grunt-mocha-hack',
'        // to work around the issue that mocha lets uncaught exceptions',
'        // escape and grunt as of version 0.4.x likes to catch uncaught',
'        // exceptions and exit. It\'s nasty and requires intimate knowledge',
'        // of Mocha internals',
'        if (mocha.files.length) {',
'          mocha.loadFiles();',
'        }',
'        var mochaSuite = mocha.suite;',
'        var mochaOptions = mocha.options;',
'        var mochaRunner = new Mocha.Runner(mochaSuite);',
'        var mochaReporter = new mocha._reporter(mochaRunner);',
'        mochaRunner.ignoreLeaks = false !== mochaOptions.ignoreLeaks;',
'        mochaRunner.asyncOnly = mochaOptions.asyncOnly;',
'        if (mochaOptions.grep) {',
'          mochaRunner.grep(mochaOptions.grep, mochaOptions.invert);',
'        }',
'        if (mochaOptions.globals) {',
'          mochaRunner.globals(mochaOptions.globals);',
'        }',
'        if (mochaOptions.growl) {',
'          mocha._growl(mochaRunner, mochaReporter);',
'        }',
'',
'        var runDomain = domain.create();',
'        runDomain.on(\'error\', mochaRunner.uncaught.bind(mochaRunner));',
'        runDomain.run(function() {',
'          mochaRunner.run(function(failureCount) {',
'            callback(null, failureCount);',
'          });',
'        });',
'        // I wish I could just do this...',
'        // mocha.run(function(failureCount) {',
'        //   callback(null, failureCount);',
'        // });',
'      } catch (error) {',
'        // catch synchronous (uncaught) exceptions thrown as a result',
'        // of loading the test files so that they can be reported with',
'        // better details',
'        callback(error);',
'      }',
'    });',
'  };',
'}',
'module.exports = MochaWrapper;'];
_$jscoverage['tasks/lib/MochaWrapper.js'][34]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][1]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][38]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][5]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][4]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][2]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][41]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][26]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][15]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][8]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][17]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][18]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][25]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][6]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][16]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][47]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][35]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][28]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][32]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][29]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][30]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][31]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][33]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][37]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][40]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][44]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][45]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][46]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][48]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][59]=0;
_$jscoverage['tasks/lib/MochaWrapper.js'][64]=0;
}_$jscoverage['tasks/lib/MochaWrapper.js'][1]++;
var Mocha = require('mocha');
_$jscoverage['tasks/lib/MochaWrapper.js'][2]++;
var domain = require('domain');

_$jscoverage['tasks/lib/MochaWrapper.js'][4]++;
function MochaWrapper(params) {
  _$jscoverage['tasks/lib/MochaWrapper.js'][5]++;
var mocha = new Mocha(params.options);
  _$jscoverage['tasks/lib/MochaWrapper.js'][6]++;
params.files.forEach(mocha.addFile.bind(mocha));

  _$jscoverage['tasks/lib/MochaWrapper.js'][8]++;
this.run = function(callback) {
    // This init domain will catch asynchronous (uncaught) exceptions
    // thrown as a result of loading the test files, this is fine as
    // long as the tests have not already completed successfully before
    // the exception is thrown (which probably would not make sense anyway).
    // In such cases the exception will be reported but grunt will also report
    // "Done, without errors."
    _$jscoverage['tasks/lib/MochaWrapper.js'][15]++;
var initDomain = domain.create();
    _$jscoverage['tasks/lib/MochaWrapper.js'][16]++;
initDomain.on('error', callback);
    _$jscoverage['tasks/lib/MochaWrapper.js'][17]++;
initDomain.run(function() {
      _$jscoverage['tasks/lib/MochaWrapper.js'][18]++;
try {
        // This hack is a copy of the hack used in
        // https://github.com/gregrperkins/grunt-mocha-hack
        // to work around the issue that mocha lets uncaught exceptions
        // escape and grunt as of version 0.4.x likes to catch uncaught
        // exceptions and exit. It's nasty and requires intimate knowledge
        // of Mocha internals
        _$jscoverage['tasks/lib/MochaWrapper.js'][25]++;
if (mocha.files.length) {
          _$jscoverage['tasks/lib/MochaWrapper.js'][26]++;
mocha.loadFiles();
        }
        _$jscoverage['tasks/lib/MochaWrapper.js'][28]++;
var mochaSuite = mocha.suite;
        _$jscoverage['tasks/lib/MochaWrapper.js'][29]++;
var mochaOptions = mocha.options;
        _$jscoverage['tasks/lib/MochaWrapper.js'][30]++;
var mochaRunner = new Mocha.Runner(mochaSuite);
        _$jscoverage['tasks/lib/MochaWrapper.js'][31]++;
var mochaReporter = new mocha._reporter(mochaRunner);
        _$jscoverage['tasks/lib/MochaWrapper.js'][32]++;
mochaRunner.ignoreLeaks = false !== mochaOptions.ignoreLeaks;
        _$jscoverage['tasks/lib/MochaWrapper.js'][33]++;
mochaRunner.asyncOnly = mochaOptions.asyncOnly;
        _$jscoverage['tasks/lib/MochaWrapper.js'][34]++;
if (mochaOptions.grep) {
          _$jscoverage['tasks/lib/MochaWrapper.js'][35]++;
mochaRunner.grep(mochaOptions.grep, mochaOptions.invert);
        }
        _$jscoverage['tasks/lib/MochaWrapper.js'][37]++;
if (mochaOptions.globals) {
          _$jscoverage['tasks/lib/MochaWrapper.js'][38]++;
mochaRunner.globals(mochaOptions.globals);
        }
        _$jscoverage['tasks/lib/MochaWrapper.js'][40]++;
if (mochaOptions.growl) {
          _$jscoverage['tasks/lib/MochaWrapper.js'][41]++;
mocha._growl(mochaRunner, mochaReporter);
        }

        _$jscoverage['tasks/lib/MochaWrapper.js'][44]++;
var runDomain = domain.create();
        _$jscoverage['tasks/lib/MochaWrapper.js'][45]++;
runDomain.on('error', mochaRunner.uncaught.bind(mochaRunner));
        _$jscoverage['tasks/lib/MochaWrapper.js'][46]++;
runDomain.run(function() {
          _$jscoverage['tasks/lib/MochaWrapper.js'][47]++;
mochaRunner.run(function(failureCount) {
            _$jscoverage['tasks/lib/MochaWrapper.js'][48]++;
callback(null, failureCount);
          });
        });
        // I wish I could just do this...
        // mocha.run(function(failureCount) {
        //   callback(null, failureCount);
        // });
      } catch (error) {
        // catch synchronous (uncaught) exceptions thrown as a result
        // of loading the test files so that they can be reported with
        // better details
        _$jscoverage['tasks/lib/MochaWrapper.js'][59]++;
callback(error);
      }
    });
  };
}
_$jscoverage['tasks/lib/MochaWrapper.js'][64]++;
module.exports = MochaWrapper;