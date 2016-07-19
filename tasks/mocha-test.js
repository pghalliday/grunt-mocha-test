var MochaWrapper = require('./lib/MochaWrapper');
var fs = require('fs');
var path = require('path');
var hooker = require('hooker');

module.exports = function(grunt) {

  // Helper to capture task output (adapted from tests for grunt-contrib-jshint)
  var capture = function(captureFile, quiet, run, done) {
    
    // Execute the code whose output is to be captured
    run(function(error, failureCount) {
      // Actually test the actually-logged stdout string to the expected value
      done(error, failureCount);
    });
  };

  grunt.registerMultiTask('mochaTest', 'Run node unit tests with Mocha', function() {
    var done = this.async();
    var options = this.options();
    var files = this.files;

    // mocha CLI parameters
    var params = ['grep', 'ui', 'reporter', 'timeout', 'invert', 'ignoreLeaks', 'growl', 'globals', 'require', 'colors', 'slow'];

    // for every supplied CLI parameter overwrite task option
    params.forEach(function(param) {
      options[param] = grunt.option(param) || options[param];
    });

    // check if there are files to test
    if (this.filesSrc.length === 0) {
      grunt.log.write('No files to check...');
      grunt.log.ok();
      done(true);
      return;
    }

    // Another hack copied from
    // https://github.com/gregrperkins/grunt-mocha-hack
    // This time we are preventing grunt handling asynchronous
    // exceptions that are thrown when handling asynchronous exceptions
    // (I think) - See the `asyncSuperTest` scenario
    var uncaughtExceptionHandlers = process.listeners('uncaughtException');
    process.removeAllListeners('uncaughtException');
    var unmanageExceptions = function() {
      uncaughtExceptionHandlers.forEach(
        process.on.bind(process, 'uncaughtException'));
    };
    var restore = function() {
      unmanageExceptions();
    };

    capture(options.captureFile, options.quiet, function(complete) {
      var mochaWrapper = new MochaWrapper({
        files: files,
        options: options
      });
      mochaWrapper.run(function(error, failureCount) {
        if (error) {
          grunt.log.error('Mocha exploded!');
          grunt.log.error(error.stack);
          complete(error);
        } else {
          complete(null, failureCount);
        }
       
      });
    }, function(error, failureCount) {
      // restore the uncaught exception handlers
      restore();
      if (error) {
        done(false);
      } else {
        done(failureCount === 0);
      }
    });
  });
};
