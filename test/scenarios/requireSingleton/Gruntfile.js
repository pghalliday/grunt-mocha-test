module.exports = function(grunt) {
  // Add our custom tasks.
  grunt.loadTasks('../../../tasks');

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      options: {
        reporter: 'spec',
        require: 'require/singleton'
      },
      all: {
        src: ['test1.js', 'test2.js']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['mochaTest']);
};
