/*jshint loopfunc: true */

var expect = require('chai').expect;
var exec = require('child_process').exec;
var fs = require('fs');

var mergeCoverageData = function(data) {
  // we have to reconstruct the the _$jscoverage data
  // format as it cannot be stringified to JSON with
  // the additional source property added to arrays
  if (typeof global._$jscoverage === 'undefined') {
    global._$jscoverage = {};
  }
  var jscoverage = global._$jscoverage;
  var sourceArrays = data.sourceArrays;
  var callCounts = data.callCounts;
  for (var filename in sourceArrays) {
    var dest = jscoverage[filename];
    var src = callCounts[filename];
    src.source = sourceArrays[filename];
    if (typeof dest === 'undefined') {
      jscoverage[filename] = src;
    } else {
      src.forEach(function(count, index) {
        if (count !== null) {
          dest[index] += count;
        }
      });
    }
  }
};

var execScenario = function(scenario, callback) {
  var scenarioDir = __dirname + '/../scenarios/' + scenario;
  var child = exec('node ../grunt.js', {cwd: scenarioDir}, function(error, stdout, stderr) {
    // collect coverage data from file if it exists
    // this is because the coverage tool does not
    // really work with child processes so we are
    // giving it a helping hand
    var jscoverageFile = scenarioDir + '/jscoverage.json';
    if (fs.existsSync(jscoverageFile)) {
      mergeCoverageData(JSON.parse(fs.readFileSync(jscoverageFile)));
    }
    callback(error, stdout, stderr);
  });
};

describe('grunt-mocha-test', function() {
  it('should run tests from the supplied files', function(done) {
    execScenario('tests', function(error, stdout, stderr) {
      expect(stdout).to.match(/test1/);
      expect(stdout).to.match(/test2/);
      expect(stdout).to.match(/2 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should run tests from the supplied files with expand option', function(done) {
    execScenario('testsExpand', function(error, stdout, stderr) {
      expect(stdout).to.match(/test1/);
      expect(stdout).to.match(/test2/);
      expect(stdout).to.match(/2 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should report the number of test failures and exit grunt with an error on failed tests', function(done) {
    execScenario('testFailure', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stderr).to.match(/1 failing/);
      done();
    });
  });

  it('should cleanly catch asynchronous test failures so that grunt does not exit early', function(done) {
    execScenario('asyncTestFailure', function(error, stdout, stderr) {
      expect(stdout).to.match(/Asynchronous test/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stderr).to.match(/1 failing/);
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

  it('should cleanly catch and log net connect exceptions thrown asynchronously by Mocha so that grunt does not exit early', function(done) {
    execScenario('connectFailure', function(error, stdout, stderr) {
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stderr).to.match(/1 failing/);
      done();
    });
  });

  it('should cleanly catch and log exceptions thrown asynchronously by tests that have a before that starts an HTTP server', function(done) {
    execScenario('asyncFailureWithBefore', function(error, stdout, stderr) {
      expect(stdout).to.match(/async tests/);
      expect(stdout).to.match(/2 passing/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stderr).to.match(/1 failing/);
      done();
    });
  });

  it('should support the require option', function(done) {
    execScenario('requireOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the colors option', function(done) {
    execScenario('colorsOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/\u001b\[4mRunning \"mochaTest:all\" \(mochaTest\) task\u001b\[24m\n\n\n  test\n    ◦ should be ok: \u001b\[2K\u001b\[0G    ✓ should be ok \n\n\n  1 passing/);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the require option with arrays', function(done) {
    execScenario('requireArrayOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the require option with coffee-script', function(done) {
    execScenario('requireCompilersOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test coffee-script/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the grep option', function(done) {
    execScenario('grepOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/tests that match grep/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the invert option', function(done) {
    execScenario('invertOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/tests that don't match grep/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the ignoreLeaks option', function(done) {
    execScenario('ignoreLeaksOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stderr).to.match(/1 failing/);
      expect(stderr).to.match(/Error: global leak detected: leak/);
      done();
    });
  });

  it('should support the globals option', function(done) {
    execScenario('globalsOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the asyncOnly option', function(done) {
    execScenario('asyncOnlyOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stderr).to.match(/1 failing/);
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
      expect(stdout).to.match(/2 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support using a custom ui option', function(done) {
    execScenario('uiOptionCustom', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/1 passing/);
      expect(stdout).to.match(/Done, without errors./);
      expect(stderr).to.equal('');
      done();
    });
  });

  it('should support the timeout option', function(done) {
    execScenario('timeoutOption', function(error, stdout, stderr) {
      expect(stdout).to.match(/test/);
      expect(stdout).to.match(/Aborted due to warnings./);
      expect(stderr).to.match(/1 failing/);
      expect(stderr).to.match(/Error: timeout of 500ms exceeded/);
      done();
    });
  });

  it('should support the growl option', function(done) {
    execScenario('growlOption', function(error, stdout, stderr) { 
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

    execScenario('destinationFile', function(error, stdout, stderr) {
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

    execScenario('quietOption', function(error, stdout, stderr) {
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
});