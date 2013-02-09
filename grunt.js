/*global module:false*/
module.exports = function(grunt) {

  // Add our custom tasks.
  grunt.loadTasks('tasks');

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    mochaTest: {
      files: ['test/**/*.test.js']
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        strict: false
      },
      globals: {
        describe: false,
        it: false
      }
    },
    mochaTestConfig: {
      options: {
        reporter: 'nyan',
        require: 'test/common'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint mochaTest');
};
