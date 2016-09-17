const path = require('path');

module.exports = function(grunt, testDir, config, tasks, modules) {
  tasks = tasks || ['mochaTest'];
  modules = modules || [];

  tasks = ['continue:on'].concat(tasks);
  tasks = tasks.concat([
    'continue:off',
    'storeCoverage',
    'continue:fail-on-warning'
  ]);

  // Add our tasks.
  grunt.loadTasks('../../../tasks');
  grunt.loadTasks('../../../../node_modules/grunt-istanbul/tasks');
  grunt.loadTasks('../../../../node_modules/grunt-continue/tasks');
  modules.forEach(function(mod) {
    grunt.loadTasks(mod);
  });


  Object.assign(config, {
    storeCoverage: {
      options: {
        dir: path.resolve(testDir, `../../../../reports/scenarios/${path.basename(testDir)}`)
      }
    }
  });

  // Project configuration.
  grunt.initConfig(config);

  // Default task.
  grunt.registerTask('default', tasks);
};
