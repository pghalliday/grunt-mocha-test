var gruntShared = require('../../helpers/grunt-shared');
module.exports = function(grunt) {
  gruntShared(grunt, __dirname, {
    mochaTest: {
      options: {
        reporter: 'spec',
        ignoreLeaks: false
      },
      all: {
        src: ['*.js']
      }
    }
  });
};
