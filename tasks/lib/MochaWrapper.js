var Mocha = require('mocha');
var Module = require('module');
var domain = require('domain');

function MochaWrapper(params) {
  var mocha = new Mocha(params.options);
  params.files.forEach(function(path) {
    mocha.addFile(path);
  });

  this.run = function(callback) {
    var error;

    // Clear all the files we can in the require cache in case we are run from watch.
    // NB. This is required to ensure that all tests are run and that all the modules under
    // test have been reloaded and are not in some kind of cached state
    for (var key in Module._cache) {
      if (Module._cache[key]) {
        delete Module._cache[key];
        if (Module._cache[key]) {
          error = new Error('Could not delete from require cache:\n' + key);
        }
      } else {
        error = new Error('Could not find key in require cache:\n' + key);
      }
    }
    var moduleWithState = require('../../test/lib/moduleWithState');
    if (moduleWithState.state !== 'hello') {
      error = new Error('moduleWithState.state is "' + moduleWithState.state + '"');
    }

    if (error) {
      callback(error);
    } else {
      // This hack is a copy of the hack used in
      // https://github.com/gregrperkins/grunt-mocha-hack
      // to work around the issue that mocha lets uncaught exceptions
      // escape and grunt as of version 0.4.x likes to catch uncaught
      // exceptions and exit. It's nasty and requires intimate knowledge
      // of Mocha internals
      if (mocha.files.length) {
        mocha.loadFiles();
      }
      var suite = mocha.suite;
      var internaloptions = mocha.options;
      var runner = new Mocha.Runner(suite);
      var reporter = new mocha._reporter(runner);
      runner.ignoreLeaks = false !== internaloptions.ignoreLeaks;
      runner.asyncOnly = internaloptions.asyncOnly;
      if (internaloptions.grep) {
        runner.grep(internaloptions.grep, internaloptions.invert);
      }
      if (internaloptions.globals) {
        runner.globals(internaloptions.globals);
      }
      if (internaloptions.growl) {
        this._growl(runner, reporter);
      }
      var d = domain.create();
      d.on('error', runner.uncaught.bind(runner));
      d.run(function() {
        try {
          runner.run(function(failureCount) {
            callback(null, failureCount);
          });
        } catch (error) {
          callback(error);
        }
      });
      // I wish I could just do this...
      // mocha.run(function(failureCount) {
      //   callback(null, failureCount);
      // });
    }
  };
}
module.exports = MochaWrapper;