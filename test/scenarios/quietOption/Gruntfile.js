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
        options: {
          quiet: true
        },
        src: ['*.js'],
        dest: 'output'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['mochaTest']);
};
