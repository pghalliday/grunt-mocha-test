var gruntShared = require('../../helpers/grunt-shared');
module.exports = function(grunt) {
  gruntShared(grunt, __dirname, {
    mochaTest: {
      test:{
        options:{reporter:"spec", require:__dirname+"/example-ui.js", ui:"example-ui"},
        src:"test.js"
      }
    },
  });
};
