module.exports = function(grunt) {
  // Add our custom tasks.
  grunt.loadTasks('../../../tasks');

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      all: {
        src: ['*.js'],
        options: {
          require: 'require/common'
        }
      },
      cli: {
        src: ['*.js']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['mochaTest:all']);
};
