module.exports = function(grunt) {
  // Add our custom tasks.
  grunt.loadTasks('../../../tasks');

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      on: {
        options: {
          clearRequireCache: true
        },
        src: ['teston.js']
      },
      off: {
        options: {
          clearRequireCache: false
        },
        src: ['testoff.js']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['mochaTest:off', 'mochaTest:on']);
};
