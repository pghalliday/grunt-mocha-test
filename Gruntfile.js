module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
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
    clean: {
      coverage: {
        src: ['.coverage/']
      }
    },
    copy: {
      test: {
        src: ['test/**'],
        dest: '.coverage/'
      }
    },
    blanket: {
      tasks: {
        src: ['tasks/'],
        dest: '.coverage/tasks/'
      }
    },
    mochaTest: {
      all: {
        options: {
          reporter: 'spec',
        },
        src: ['.coverage/test/tasks/**/*.js']
      },
      'html-cov': {
        options: {
          reporter: 'html-cov',
          quiet: true
        },
        src: ['.coverage/test/tasks/**/*.js'],
        dest: 'coverage.html'
      },
      'travis-cov': {
        options: {
          reporter: 'travis-cov'
        },
        src: ['.coverage/test/tasks/**/*.js']
      }
    },
  });

  // Default task.
  grunt.registerTask('build', ['clean', 'blanket', 'copy']);
  grunt.registerTask('default', ['jshint', 'build', 'mochaTest']);
};
