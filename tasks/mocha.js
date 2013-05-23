module.exports = function(grunt) {
  var MochaWrapper = require('./lib/MochaWrapper');
  var fs= require('fs');

  // Helper to capture task output (adapted from tests for grunt-contrib-jshint)
  var capture = function(captureFile, quiet, run, done) {
    var fd;
    if (captureFile) {
      fd = fs.openSync(captureFile, 'w');
    }
    // Hook process.stdout.write
    var hooker = grunt.util.hooker;
    hooker.hook(process.stdout, 'write', {
      // This gets executed before the original process.stdout.write
      pre: function(result) {
        // Write result to file if it was opened
        if (fd) {
          fs.writeSync(fd, result);
        }
        // Prevent the original process.stdout.write from executing if quiet was specified
        if (quiet) {
          return hooker.preempt();
        }
      }
    });
    // Execute the code whose output is to be captured
    run(function(error, failureCount) {
      // close the file if it was opened
      if (fd) {
        fs.closeSync(fd);
      }
      // Restore process.stdout.write to its original value
      hooker.unhook(process.stdout, 'write');
      // Actually test the actually-logged stdout string to the expected value
      done(error, failureCount);
    });
  };

  grunt.registerMultiTask('mochaTest', 'Run node unit tests with Mocha', function() {
    var done = this.async();
    var options = this.options();

    // asynchronously loop through the file specifications
    grunt.util.async.forEachSeries(this.files, function(file) {
      capture(file.dest, options.quiet, function(complete) {
        var mochaWrapper = new MochaWrapper({
          files: file.src,
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
        if (error) {
          done(false);
        } else {
          done(failureCount === 0);
        }
      });
    });
  });
};
