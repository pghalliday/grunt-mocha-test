module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-istanbul');
  grunt.loadNpmTasks('grunt-istanbul-coverage');
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
        mocha: true,
        esversion: 6
      },
      all: {
        src: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js']
      }
    },
    clean: {
      coverage: {
        src: ['lib-cov/']
      },
      reports: {
        src: ['reports/']
      }
    },
    copy: {
      test: {
        src: ['test/**'],
        dest: 'lib-cov/'
      }
    },
    instrument: {
      files: 'tasks/**/*.js',
      options: {
        lazy: true,
        basePath: 'lib-cov/'
      }
    },
    mochaTest: {
      spec: {
        options: {
          reporter: 'spec',
          // tests are quite slow as they spawn node processes
          timeout: 10000
        },
        src: ['lib-cov/test/tasks/**/*.js']
      },
    },
    makeReport: {
      src: 'reports/**/*.json',
      options: {
        type: 'lcov',
        dir: 'reports',
        print: 'detail'
      }
    },
    coverage: {
      default: {
        options: {
          thresholds: {
            'statements': 100,
            'branches': 95,
            'lines': 100,
            'functions': 100
          },
          dir: 'reports'
        }
      }
    },
    coveralls: {
      options: {
        force: true
      },
      all: {
        src: 'reports/lcov.info'
      }
    }
  });

  // Default task.
  grunt.registerTask('build', ['clean', 'instrument', 'copy']);
  grunt.registerTask('default', ['jshint', 'build', 'mochaTest', 'makeReport', 'coverage']);
  grunt.registerTask('ci', ['default', 'coveralls']);
};
