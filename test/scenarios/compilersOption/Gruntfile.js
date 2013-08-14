module.exports = function(grunt) {
  // Add our custom tasks.
  grunt.loadTasks('../../../tasks');

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      options: {
        reporter: 'spec',
        require: [
          'coffee-script'
        ]
      },
      all: {
        src: ['*.coffee']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['mochaTest']);
};
