var gruntShared = require('../../helpers/grunt-shared');
module.exports = function(grunt) {
  gruntShared(grunt, __dirname, {
    mochaTest: {
      options: {
        reporter: 'spec',
        ignoreLeaks: false,
        globals: ['leak']
      },
      all: {
        src: ['*.js']
      }
    }
  });
};
