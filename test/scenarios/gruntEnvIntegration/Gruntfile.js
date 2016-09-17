var gruntShared = require('../../helpers/grunt-shared');
module.exports = function(grunt) {
  gruntShared(grunt, __dirname, {
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
  }, ['env', 'mochaTest'], ['../../../../node_modules/grunt-env/tasks']);
};
