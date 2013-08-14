module.exports = (grunt) ->
  # Add our custom tasks.
  grunt.loadTasks '../../../tasks'

  # Project configuration.
  grunt.initConfig
    mochaTest:
      options:
        reporter: 'spec',
        require: [
          'coffee-script',
          './globals'
        ]
      all:
        src: ['test.coffee']

  # Default task.
  grunt.registerTask 'default', ['mochaTest']
