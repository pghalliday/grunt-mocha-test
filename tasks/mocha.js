module.exports = function(grunt) {
  var MochaWrapper = require('./lib/MochaWrapper');
  var fs= require('fs');

  // Helper to capture task output (adapted from tests for grunt-contrib-jshint)
  var capture = function(quiet, run, done) {
    var output = '';
    // Hook process.stdout.write
    var hooker = grunt.util.hooker;
    hooker.hook(process.stdout, 'write', {
      // This gets executed before the original process.stdout.write.
      pre: function(result) {
        // Concatenate uncolored result onto output.
        output += grunt.log.uncolor(result);
        if (quiet) {
          // Prevent the original process.stdout.write from executing.
          return hooker.preempt();
        }
      }
    });
    // Execute the code whose output is to be captured
    run(function(error, failureCount) {
      // Restore process.stdout.write to its original value.
      hooker.unhook(process.stdout, 'write');
      // Actually test the actually-logged stdout string to the expected value.
      done(error, failureCount, output);
    });
  };

  grunt.registerMultiTask('mochaTest', 'Run node unit tests with Mocha', function() {
    var done = this.async();
    var options = this.options();

    // asynchronously loop through the file specifications
    grunt.util.async.forEachSeries(this.files, function(file) {
      capture(options.quiet, function(complete) {
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
      }, function(error, failureCount, output) {
        if (file.dest) {
          grunt.file.write(file.dest, output);
        }
        if (error) {
          done(false);
        } else {
          done(failureCount === 0);
        }
      });
    });
  });
};
