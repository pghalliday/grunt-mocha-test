var gruntShared = require('../../helpers/grunt-shared');
module.exports = function(grunt) {
  gruntShared(grunt, __dirname, {
    mochaTest: {
      options: {
        reporter: 'spec',
        require: 'require/singleton'
      },
      all: {
        src: ['test1.js', 'test2.js']
      }
    }
  });
};
