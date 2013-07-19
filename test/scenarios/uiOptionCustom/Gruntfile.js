module.exports = function(grunt) {
  grunt.loadTasks('../../../tasks');
  grunt.initConfig({
    mochaTest: {
      test:{
        options:{reporter:"spec", require:__dirname+"/example-ui.js", ui:"example-ui"},
        src:"test.js"
      }
    },
  });
  grunt.registerTask('default', ['mochaTest']);
};