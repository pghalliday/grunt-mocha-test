/*global testVar4:true, testVar5:true*/

var gruntShared = require('../../helpers/grunt-shared');
module.exports = function(grunt) {
  gruntShared(grunt, __dirname, {
    mochaTest: {
      options: {
        reporter: 'spec',
        require: [
          'require/common1',
          'require/common2',
          'require/common3',
          function(){ testVar4=require('./require/common4'); },
          function(){ testVar5=':)'; }
        ]
      },
      all: {
        src: ['*.js']
      }
    }
  });
};
