/*jshint loopfunc: true */

var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var ChildProcess = require('cover-child-process').ChildProcess;
var Blanket = require('cover-child-process').Blanket;
var childProcess = new ChildProcess(new Blanket());
var gruntExec = 'node ' + path.resolve('node_modules/grunt-cli/bin/grunt');
var rimrafSync = require('rimraf').sync;

var execScenario = function(command, scenario, callback) {
  var scenarioDir = __dirname + '/../scenarios/' + scenario;
  childProcess.exec(command, {cwd: scenarioDir}, callback);
};

describe('grunt-mocha-test', function() {
  it('should run tests from the supplied files', function(done) {
    execScenario(gruntExec, 'tests', function(error, stdout, stderr) {
      expect(stdout).to.match(/test1/);
      expect(stdout).to.match(/test2/);
      expect(stdout).to.match(/2 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should run tests from the supplied files with expand option', function(done) {
    execScenario(gruntExec, 'testsExpand', function(error, stdout, stderr) {
      expect(stdout).to.match(/test1/);
      expect(stdout).to.match(/test2/);
      expect(stdout).to.match(/2 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should report the number of test failures and exit grunt with an error on failed tests', function(done) {
    execScenario(gruntExec, 'testFailure', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stdout).to.match(/1 failing/);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should cleanly catch asynchronous test failures so that grunt does not exit early', function(done) {
    execScenario(gruntExec, 'asyncTestFailure', function(error, stdout, stderr) {
      expect(stdout).to.match(/Asynchronous test/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stdout).to.match(/1 failing/);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should cleanly catch and log require exceptions thrown synchronously by Mocha so that grunt does not exit early', function(done) {
    execScenario(gruntExec, 'requireFailure', function(error, stdout, stderr) {
      expect(stdout).to.match(/Cannot find module 'doesNotExist/);
      expect(stdout).to.match(/test.js/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should cleanly catch and log net connect exceptions thrown asynchronously by Mocha so that grunt does not exit early', function(done) {
    execScenario(gruntExec, 'connectFailure', function(error, stdout, stderr) {
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stdout).to.match(/1 failing/);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should cleanly catch and log exceptions thrown asynchronously by tests that have a before that starts an HTTP server', function(done) {
    execScenario(gruntExec, 'asyncFailureWithBefore', function(error, stdout, stderr) {
      expect(stdout).to.match(/async tests/);
      expect(stdout).to.match(/2 passing/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stdout).to.match(/1 failing/);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the require option', function(done) {
    execScenario(gruntExec, 'requireOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the require option via CLI', function(done) {
    execScenario(gruntExec + " mochaTest:cli --require=require/common", 'requireOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the colors option', function(done) {
    execScenario(gruntExec, 'colorsOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/\u001b\[4mRunning \"mochaTest:all\" \(mochaTest\) task\u001b\[24m\n\n\n  test\n\r    ✓ should be ok \n\n\n  1 passing/);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the require option with arrays', function(done) {
    execScenario(gruntExec, 'requireArrayOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the require option with complicated globals', function(done) {
    execScenario(gruntExec, 'requireSingleton', function(error, stdout, stderr) {
      expect(stdout).to.match(/test1/);
      expect(stdout).to.match(/test2/);
      expect(stdout).to.match(/2 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the require option with coffee-script', function(done) {
    execScenario(gruntExec, 'requireCompilersOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test coffee-script/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the clearRequireCacheOption', function(done) {
    execScenario(gruntExec, 'clearRequireCacheOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/mochaTest:on/);
      expect(stdout).to.match(/mochaTest:off/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).not.to.match(/0 passing/);
      expect(stdout).not.to.match(/2 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the clearRequireCacheOption with the require option', function(done) {
    execScenario(gruntExec, 'clearRequireCacheAndRequireOptions', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the grep option', function(done) {
    execScenario(gruntExec, 'grepOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/tests that match grep/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the invert option', function(done) {
    execScenario(gruntExec, 'invertOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/tests that don't match grep/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the ignoreLeaks option', function(done) {
    execScenario(gruntExec, 'ignoreLeaksOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stdout).to.match(/1 failing/);
      expect(stdout).to.match(/Error: global leak detected: leak/);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the globals option', function(done) {
    execScenario(gruntExec, 'globalsOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the asyncOnly option', function(done) {
    execScenario(gruntExec, 'asyncOnlyOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stdout).to.match(/1 failing/);
      expect(stdout).to.match(/Error: --async-only option in use without declaring/);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the reporter option', function(done) {
    execScenario(gruntExec, 'reporterOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/<section class="suite">/);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the reporter option via CLI', function(done) {
    execScenario(gruntExec + " --reporter=spec", 'reporterOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/Running "mochaTest:all"/);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the ui option', function(done) {
    execScenario(gruntExec, 'uiOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test1/);
      expect(stdout).to.match(/test2/);
      expect(stdout).to.match(/2 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support using a custom ui option', function(done) {
    execScenario(gruntExec, 'uiOptionCustom', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the timeout option', function(done) {
    execScenario(gruntExec, 'timeoutOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stdout).to.match(/1 failing/);
      expect(stdout).to.match(/Error: timeout of 500ms exceeded/);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the growl option', function(done) {
    execScenario(gruntExec, 'growlOption', function(error, stdout, stderr) {
      // TODO: Let's just test that everything completed successfully
      // as there's no way of knowing if growl was actually called for now.
      // A possible option would be to mock the growl binaries in the
      // growlOption scenario directory and have them do something that
      // the test can detect (HTTP server/request?). This would have to
      // be done for each platform though.
      expect(stdout).to.match(/test1/);
      expect(stdout).to.match(/test2/);
      expect(stdout).to.match(/2 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support a destination file to write output', function(done) {
    var destinationFile = __dirname + '/../scenarios/destinationFile/output';

    // first remove the destination file
    if (fs.existsSync(destinationFile)) {
      fs.unlinkSync(destinationFile);
    }

    execScenario(gruntExec, 'destinationFile', function(error, stdout, stderr) {
      expect(stdout).to.match(/test1/);
      expect(stdout).to.match(/test2/);
      expect(stdout).to.match(/2 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');

      // now read the destination file
      var output = fs.readFileSync(destinationFile, 'utf8');
      expect(output).to.match(/test1/);
      expect(output).to.match(/test2/);
      expect(output).to.match(/2 passing/);

      done();
    });
  });

  it('should create parent directories for destination file', function(done) {
    var destinationDirectory = path.join(__dirname, '/../scenarios/destinationFileCreateDirectories/reports');
    var destinationFile = path.join(destinationDirectory, 'output');

    rimrafSync(destinationDirectory);

    execScenario(gruntExec, 'destinationFileCreateDirectories', function(error, stdout, stderr) {
      expect(stdout).to.match(/test1/);
      expect(stdout).to.match(/test2/);
      expect(stdout).to.match(/2 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');

      // now read the destination file
      var output = fs.readFileSync(destinationFile, 'utf8');
      expect(output).to.match(/test1/);
      expect(output).to.match(/test2/);
      expect(output).to.match(/2 passing/);

      done();
    });
  });

  it('should support the quiet option', function(done) {
    var destinationFile = __dirname + '/../scenarios/quietOption/output';

    // first remove the destination file
    if (fs.existsSync(destinationFile)) {
      fs.unlinkSync(destinationFile);
    }

    execScenario(gruntExec, 'quietOption', function(error, stdout, stderr) {
      expect(stdout).to.not.match(/test1/);
      expect(stdout).to.not.match(/test2/);
      expect(stdout).to.not.match(/2 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');

      // now read the destination file
      var output = fs.readFileSync(destinationFile, 'utf8');
      expect(output).to.match(/test1/);
      expect(output).to.match(/test2/);
      expect(output).to.match(/2 passing/);

      done();
    });
  });

  it('should not run if the src config do not match any files', function(done) {
    execScenario(gruntExec, 'noFiles', function(error, stdout, stderr) {
      expect(stdout).to.match(/No files to check.../);
      expect(stdout).to.match(/Done, without errors./);
      expect(stdout).not.to.match(/0 passing/);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should work with grunt-env', function(done) {
    execScenario(gruntExec, 'gruntEnvIntegration', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should work with the xunit reporter', function(done) {
    execScenario(gruntExec, 'xunitReporter', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/tests="1"/);
      expect(stdout).to.match(/failures="0"/);
      expect(stdout).to.match(/errors="0"/);
      expect(stdout).to.match(/skipped="0"/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support reporterOptions', function(done) {
    var destinationFile = __dirname + '/../scenarios/reporterOptions/output';

    // first remove the destination file
    if (fs.existsSync(destinationFile)) {
      fs.unlinkSync(destinationFile);
    }

    execScenario(gruntExec, 'reporterOptions', function(error, stdout, stderr) {
      expect(stdout).to.not.match(/test/);
      expect(stdout).to.not.match(/tests="1000"/);
      expect(stdout).to.not.match(/failures="0"/);
      expect(stdout).to.not.match(/errors="0"/);
      expect(stdout).to.not.match(/skipped="0"/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');

      // now read the destination file
      var output = fs.readFileSync(destinationFile, 'utf8');
      expect(output).to.match(/test/);
      expect(output).to.match(/tests="1000"/);
      expect(output).to.match(/failures="0"/);
      expect(output).to.match(/errors="0"/);
      expect(output).to.match(/skipped="0"/);
      expect(output).to.match(/<testsuite.*>/);
      expect(output).to.match(/<\/testsuite>/);

      done();
    });
  });
});
