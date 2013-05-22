module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-blanket');

  // Add our custom tasks.
  grunt.loadTasks('tasks');

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
          test: false
        }
      },
      all: {
        src: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js']
      }
    },
    blanket: {
      tasks: {
        src: ['tasks/'],
        dest: '.coverage/tasks/'
      },
      test: {
        src: ['test/'],
        dest: '.coverage/test/'
      }
    },
    mochaTest: {
      all: {
        options: {
          reporter: 'spec',
        },
        src: ['test/tasks/**/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          timeout: 5000
        },
        src: ['.coverage/test/tasks/**/*.js'],
        dest: 'coverage.html'
      }
    },
  });

  // Default task.
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['mochaTest:all']);
  grunt.registerTask('coverage', ['blanket', 'mochaTest:coverage']);
  grunt.registerTask('default', ['lint', 'test', 'coverage']);
};
