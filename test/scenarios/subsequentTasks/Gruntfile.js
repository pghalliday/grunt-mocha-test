module.exports = function(grunt) {
  // Add our custom tasks.
  grunt.loadTasks('../../../tasks');
  grunt.loadTasks('../../../node_modules/grunt-contrib-jshint/tasks');
  grunt.loadTasks('../../../node_modules/grunt-contrib-watch/tasks');

  // Project configuration.
  grunt.initConfig({
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
        strict: false,
        globals: {
          describe: false,
          it: false,
          suite: false,
          test: false,
          before: false,
          after: false
        }
      },
      all: {
        src: ['*.js']
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      all: {
        src: ['*.js']
      }
    },
    watch: {
      mochaTest: {
          files: ['<%= jshint.all.src %>'],
          tasks: ['mochaTest'],
      },
    }
  });

  // Default task.
  grunt.registerTask('default', ['mochaTest', 'jshint', 'watch']);
};
