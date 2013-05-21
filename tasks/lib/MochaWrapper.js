var Mocha = require('mocha');
var domain = require('domain');

function MochaWrapper(params) {
  var mocha = new Mocha(params.options);
  params.files.forEach(mocha.addFile.bind(mocha));

  this.run = function(callback) {
    // This init domain will catch asynchronous (uncaught) exceptions
    // thrown as a result of loading the test files, this is fine as
    // long as the tests have not already completed successfully before
    // the exception is thrown (which probably would not make sense anyway).
    // In such cases the exception will be reported but grunt will also report
    // "Done, without errors."
    var initDomain = domain.create();
    initDomain.on('error', callback);
    initDomain.run(function() {
      try {
        // This hack is a copy of the hack used in
        // https://github.com/gregrperkins/grunt-mocha-hack
        // to work around the issue that mocha lets uncaught exceptions
        // escape and grunt as of version 0.4.x likes to catch uncaught
        // exceptions and exit. It's nasty and requires intimate knowledge
        // of Mocha internals
        if (mocha.files.length) {
          mocha.loadFiles();
        }
        var mochaSuite = mocha.suite;
        var mochaOptions = mocha.options;
        var mochaRunner = new Mocha.Runner(mochaSuite);
        var mochaReporter = new mocha._reporter(mochaRunner);
        mochaRunner.ignoreLeaks = false !== mochaOptions.ignoreLeaks;
        mochaRunner.asyncOnly = mochaOptions.asyncOnly;
        if (mochaOptions.grep) {
          mochaRunner.grep(mochaOptions.grep, mochaOptions.invert);
        }
        if (mochaOptions.globals) {
          mochaRunner.globals(mochaOptions.globals);
        }
        if (mochaOptions.growl) {
          this._growl(mochaRunner, mochaReporter);
        }

        var runDomain = domain.create();
        runDomain.on('error', mochaRunner.uncaught.bind(mochaRunner));
        runDomain.run(function() {
          mochaRunner.run(function(failureCount) {
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
        callback(error);
      }
    });
  };
}
module.exports = MochaWrapper;