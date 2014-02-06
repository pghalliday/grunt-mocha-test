module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-blanket');
  grunt.loadNpmTasks('grunt-coveralls');

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
          test: false,
          before: false,
          after: false
        }
      },
      all: {
        src: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js']
      }
    },
    clean: {
      coverage: {
        src: ['lib-cov/']
      }
    },
    copy: {
      test: {
        src: ['test/**'],
        dest: 'lib-cov/'
      }
    },
    blanket: {
      tasks: {
        src: ['tasks/'],
        dest: 'lib-cov/tasks/'
      }
    },
    mochaTest: {
      'spec': {
        options: {
          reporter: 'spec',
          // tests are quite slow as thy spawn node processes
          timeout: 10000
        },
        src: ['lib-cov/test/tasks/**/*.js']
      },
      'html-cov': {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'coverage.html'
        },
        src: ['lib-cov/test/tasks/**/*.js']
      },
      'mocha-lcov-reporter': {
        options: {
          reporter: 'mocha-lcov-reporter',
          quiet: true,
          captureFile: 'lcov.info'
        },
        src: ['lib-cov/test/tasks/**/*.js']
      },
      'travis-cov': {
        options: {
          reporter: 'travis-cov'
        },
        src: ['lib-cov/test/tasks/**/*.js']
      }
    },
    coveralls: {
      all: {
        src: 'lcov.info'
      }
    }
  });

  // Default task.
  grunt.registerTask('build', ['clean', 'blanket', 'copy']);
  grunt.registerTask('default', ['jshint', 'build', 'mochaTest']);
  grunt.registerTask('ci', ['default', 'coveralls']);
};
