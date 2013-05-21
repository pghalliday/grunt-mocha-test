var Mocha = require('mocha');
var domain = require('domain');

function MochaWrapper(params) {
  var mocha = new Mocha(params.options);
  params.files.forEach(mocha.addFile.bind(mocha));

  this.run = function(callback) {
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
      runner.run(function(failureCount) {
        callback(null, failureCount);
      });
    });
    // I wish I could just do this...
    // mocha.run(function(failureCount) {
    //   callback(null, failureCount);
    // });
  };
}
module.exports = MochaWrapper;