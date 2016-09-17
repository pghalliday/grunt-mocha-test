var gruntShared = require('../../helpers/grunt-shared');
module.exports = function(grunt) {
  gruntShared(grunt, __dirname, {
    mochaTest: {
      options: {
        reporter: 'spec',
        require: 'require/common',
        clearRequireCache: true
      },
      first: {
        src: ['first.js']
      },
      second: {
        src: ['second.js']
      }
    }
  });
};
