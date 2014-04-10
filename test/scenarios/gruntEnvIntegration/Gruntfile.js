module.exports = function(grunt) {
  // Add our custom tasks.
  grunt.loadTasks('../../../tasks');  
  grunt.loadTasks('../../../../node_modules/grunt-env/tasks');

  // Project configuration.
  grunt.initConfig({
    env: {
      test: {
        TEST: 'this is a test'
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      all: {
        src: ['*.js']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['env', 'mochaTest']);
};
