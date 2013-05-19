var chai = require("chai");
var expect = require('chai').expect;
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var grunt = require('grunt');

chai.use(sinonChai);
var expect = chai.expect;

var MochaWrapper = require('../../../tasks/lib/MochaWrapper');

// Helper for testing stdout (adapted from the tests
// for https://github.com/gruntjs/grunt-contrib-jshint)
var hooker = grunt.util.hooker;
var captureOutput = function(callback, done) {
  var captured = '';
  // Hook process.stdout.write
  hooker.hook(process.stdout, 'write', {
    // This gets executed before the original process.stdout.write.
    pre: function(result) {
      // Concatenate uncolored result onto actual.
      captured += grunt.log.uncolor(result);
      // Prevent the original process.stdout.write from executing.
      return hooker.preempt();
    }
  });
  // Execute the logging code to be tested.
  callback(function(error, failureCount) {
    // Restore process.stdout.write to its original value.
    hooker.unhook(process.stdout, 'write');
    // Actually test the actually-logged stdout string to the expected value.
    done(captured, error, failureCount);
  });
};

describe('MochaWrapper', function(){
  describe('#run', function() {
    it('should run tests from the supplied files', function(done) {
      var mochaWrapper  = new MochaWrapper({
        options: {
          reporter: 'spec'
        },
        files: [
          __dirname + '/../../support/test1.js',
          __dirname + '/../../support/test2.js'
        ]
      });
      captureOutput(function(loggingComplete) {
        mochaWrapper.run(loggingComplete);
      }, function(captured, error, failureCount) {
        expect(error).to.equal(null);
        expect(failureCount).to.equal(0);
        expect(captured).to.match(/test1/);
        expect(captured).to.match(/test2/);
        expect(captured).to.match(/2 tests complete/);
        done();
      });
    });

    it('should report the number of test failures', function(done) {
      var mochaWrapper  = new MochaWrapper({
        options: {
          reporter: 'spec'
        },
        files: [
          __dirname + '/../../support/testFailure.js'
        ]
      });
      captureOutput(function(loggingComplete) {
        mochaWrapper.run(loggingComplete);
      }, function(captured, error, failureCount) {
        expect(error).to.equal(null);
        expect(failureCount).to.equal(1);
        expect(captured).to.match(/test/);
        expect(captured).to.match(/1 of 1 test failed/);
        done();
      });
    });

    it('should catch and log exceptions thrown synchronously by Mocha to the console before failing the task so that it can be run from a watch task', function(done) {
      var mochaWrapper  = new MochaWrapper({
        options: {
          reporter: 'spec'
        },
        files: [
          __dirname + '/../../support/requireFailure.js'
        ]
      });
      captureOutput(function(loggingComplete) {
        mochaWrapper.run(loggingComplete);
      }, function(captured, error, failureCount) {
        expect(error.message).to.equal('Cannot find module \'doesNotExist\'');
        done();
      });
    });

    it.skip('should catch and log exceptions thrown asynchronously by Mocha to the console before failing the task so that it can be run from a watch task', function(done) {
      var mochaWrapper  = new MochaWrapper({
        options: {
          reporter: 'spec'
        },
        files: [
          __dirname + '/../../support/asyncRequireFailure.js'
        ]
      });
      captureOutput(function(loggingComplete) {
        mochaWrapper.run(loggingComplete);
      }, function(captured, error, failureCount) {
        expect(error.message).to.equal('Cannot find module \'doesNotExist\'');
        done();
      });
    });

    it.skip('should not allow uncaught errors to escape so that asynchronous test failures do not exit grunt', function(done) {
      var uncaughtExceptionSpy = sinon.spy();
      process.on('uncaughtException', uncaughtExceptionSpy);

      var mochaWrapper  = new MochaWrapper({
        options: {
          reporter: 'spec'
        },
        files: [
          __dirname + '/../../support/asyncTestFailure.js'
        ]
      });
      captureOutput(function(loggingComplete) {
        mochaWrapper.run(loggingComplete);
      }, function(captured, error, failureCount) {
        expect(error).to.equal(null);
        expect(failureCount).to.equal(0);
        expect(captured).to.match(/Asynchronous test/);
        expect(captured).to.match(/1 of 1 tests failed/);
        expect(uncaughtExceptionSpy).to.not.have.been.called();
        process.removeListener('uncaughtException', uncaughtExceptionSpy);
        done();
      });
    });

    it.skip('should not maintain the state of loaded modules between test runs so that watch tasks can be supported', function(done) {
      var mochaWrapper  = new MochaWrapper({
        options: {
          reporter: 'spec'
        },
        files: [
          __dirname + '/../../support/testWithState.js'
        ]
      });
      captureOutput(function(loggingComplete) {
        mochaWrapper.run(loggingComplete);
      }, function(captured, error, failureCount) {
        expect(error).to.equal(null);
        expect(failureCount).to.equal(0);
        expect(captured).to.match(/moduleWithState/);
        expect(captured).to.match(/1 test complete/);
        done();
      });
      captureOutput(function(loggingComplete) {
        mochaWrapper.run(loggingComplete);
      }, function(captured, error, failureCount) {
        expect(error).to.equal(null);
        expect(failureCount).to.equal(0);
        expect(captured).to.match(/moduleWithState/);
        expect(captured).to.match(/1 test complete/);
        done();
      });
    });    
  });
});