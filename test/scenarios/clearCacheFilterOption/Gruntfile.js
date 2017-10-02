var gruntShared = require('../../helpers/grunt-shared');
module.exports = function(grunt) {
  gruntShared(grunt, __dirname, {
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      on: {
        options: {
          clearRequireCache: true,
          clearCacheFilter: (key) => /mocha-test.js/.exec(key)
        },
        src: ['teston.js']
      },
      off: {
        options: {
          clearRequireCache: true
        },
        src: ['testoff.js']
      }
    }
  }, ['mochaTest:on', 'mochaTest:off']);
};
