gruntShared = require '../../helpers/grunt-shared'
module.exports = (grunt) ->
  gruntShared(grunt, __dirname,
    mochaTest:
      options:
        reporter: 'spec',
        require: [
          'coffee-script/register',
          './globals'
        ]
      all:
        src: ['test.coffee']
  )
