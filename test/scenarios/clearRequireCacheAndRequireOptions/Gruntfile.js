module.exports = function(grunt) {
  // Add our custom tasks.
  grunt.loadTasks('../../../tasks');

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      options: {
        reporter: 'spec',
        require: 'require/common',
        clearRequireCache: true
      },
      first: {
        src: ['first.js']
      },
      second: {
        src: ['second.js']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['mochaTest']);
};
