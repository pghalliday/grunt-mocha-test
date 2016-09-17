var gruntShared = require('../../helpers/grunt-shared');
module.exports = function(grunt) {
  gruntShared(grunt, __dirname, {
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      on: {
        options: {
          clearRequireCache: true
        },
        src: ['teston.js']
      },
      off: {
        options: {
          clearRequireCache: false
        },
        src: ['testoff.js']
      }
    }
  }, ['mochaTest:off', 'mochaTest:on']);
};
