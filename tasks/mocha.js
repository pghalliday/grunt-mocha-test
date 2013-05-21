module.exports = function(grunt) {
  var MochaWrapper = require('./lib/MochaWrapper');

  grunt.registerMultiTask('mochaTest', 'Run node unit tests with Mocha', function() {
    var done = this.async();
    var mochaWrapper = new MochaWrapper({
      files: this.filesSrc,
      options: this.options()
    });
    mochaWrapper.run(function(error, failureCount) {
      if (error) {
        grunt.log.error('Mocha exploded!');
        grunt.log.error(error.stack);
        done(false);
      } else {
        done(failureCount === 0);
      }
    });
  });
};
