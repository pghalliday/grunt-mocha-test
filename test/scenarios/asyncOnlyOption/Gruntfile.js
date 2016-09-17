var gruntShared = require('../../helpers/grunt-shared');
module.exports = function(grunt) {
  gruntShared(grunt, __dirname, {
    mochaTest: {
      options: {
        reporter: 'spec',
        asyncOnly: true
      },
      all: {
        src: ['*.js']
      }
    }
  });
};
