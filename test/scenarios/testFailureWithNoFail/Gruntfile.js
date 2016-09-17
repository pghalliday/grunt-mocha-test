var gruntShared = require('../../helpers/grunt-shared');
module.exports = function(grunt) {
  gruntShared(grunt, __dirname, {
    mochaTest: {
      options: {
        noFail: true,
        reporter: 'spec'
      },
      all: {
        src: ['*.js']
      }
    }
  });
};
