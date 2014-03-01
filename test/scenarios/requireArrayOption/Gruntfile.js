/*global testVar4:true, testVar5:true*/

module.exports = function(grunt) {
  // Add our custom tasks.
  grunt.loadTasks('../../../tasks');

  // Project configuration.
  grunt.initConfig({
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

  // Default task.
  grunt.registerTask('default', ['mochaTest']);
};
