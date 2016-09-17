var gruntShared = require('../../helpers/grunt-shared');
module.exports = function(grunt) {
  gruntShared(grunt, __dirname, {
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      all: {
        options: {
          quiet: true,
          captureFile: 'output'
        },
        src: ['nothingInHere/*.js']
      }
    }
  });
};
