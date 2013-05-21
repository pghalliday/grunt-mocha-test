var expect = require('chai').expect;
var exec = require('child_process').exec;

var execScenario = function(scenario, callback) {
  var command;
  if (process.platform === 'win32') {
    command = 'grunt.cmd';
  } else {
    command = 'grunt';
  }
  var child = exec('../../../node_modules/.bin/' + command, {cwd: 'test/scenarios/' + scenario}, callback);
};

describe('grunt-mocha-test', function() {
  it('should run tests from the supplied files', function(done) {
    execScenario('tests', function(error, stdout, stderr) {
      expect(stdout).to.match(/test1/);
      expect(stdout).to.match(/test2/);
      expect(stdout).to.match(/2 tests complete/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should report the number of test failures and exit grunt with an error on failed tests', function(done) {
    execScenario('testFailure', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stderr).to.match(/1 of 1 test failed/);
      done();
    });
  });

  it('should cleanly catch asynchronous test failures so that grunt does not exit early', function(done) {
    execScenario('asyncTestFailure', function(error, stdout, stderr) {
      expect(stdout).to.match(/Asynchronous test/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stderr).to.match(/1 of 1 test failed/);
      done();
    });
  });

  it('should cleanly catch and log require exceptions thrown synchronously by Mocha so that grunt does not exit early', function(done) {
    execScenario('requireFailure', function(error, stdout, stderr) {
      expect(stdout).to.match(/Cannot find module 'doesNotExist/);
      expect(stdout).to.match(/test.js/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should cleanly catch and log require exceptions thrown asynchronously by Mocha so that grunt does not exit early', function(done) {
    execScenario('asyncRequireFailure', function(error, stdout, stderr) {
      expect(stdout).to.match(/Cannot find module 'doesNotExist/);
      expect(stdout).to.match(/test.js/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the require option', function(done) {
    execScenario('requireOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/1 test complete/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the grep option', function(done) {
    execScenario('grepOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/tests that match grep/);
      expect(stdout).to.match(/1 test complete/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the invert option', function(done) {
    execScenario('invertOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/tests that don't match grep/);
      expect(stdout).to.match(/1 test complete/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the ignoreLeaks option', function(done) {
    execScenario('ignoreLeaksOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stderr).to.match(/1 of 1 test failed/);
      expect(stderr).to.match(/Error: global leak detected: leak/);
      done();
    });
  });

  it('should support the globals option', function(done) {
    execScenario('globalsOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/1 test complete/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the asyncOnly option', function(done) {
    execScenario('asyncOnlyOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stderr).to.match(/1 of 1 test failed/);
      expect(stderr).to.match(/Error: --async-only option in use without declaring/);
      done();
    });
  });

  it('should support the reporter option', function(done) {
    execScenario('reporterOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/<section class="suite">/);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the ui option', function(done) {
    execScenario('uiOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test1/);
      expect(stdout).to.match(/test2/);
      expect(stdout).to.match(/2 tests complete/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the timeout option', function(done) {
    execScenario('timeoutOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stderr).to.match(/1 of 1 test failed/);
      expect(stderr).to.match(/Error: timeout of 500ms exceeded/);
      done();
    });
  });

  it.skip('should support the growl option', function(done) {
    execScenario('growlOption', function(error, stdout, stderr) {
      // How do I test this??
      done();
    });
  });
});