# grunt-mocha-test

A grunt task for running server side mocha tests

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-mocha-test`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-mocha-test');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation

A single task example

```javascript
/*global module:false*/
module.exports = function(grunt) {

  // Add our custom tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      files: ['test/**/*.test.js']
    },
    mochaTestConfig: {
      options: {
        reporter: 'nyan'        
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'mochaTest');
};
```

A multi task example

```javascript
/*global module:false*/
module.exports = function(grunt) {

  // Add our custom tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      normal: ['test/**/*.test.js'],
      withTimeout: ['test-timeout/**/*.test.js']
    },
    mochaTestConfig: {
      normal: {
	    options: {
	      reporter: 'nyan'        
	    }
      },
      withTimeout: {
	    options: {
	      reporter: 'nyan',
	      timeout: 1000     
	    }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'mochaTest');
};
```

The following mocha options are supported

- grep
- ui
- reporter
- timeout
- invert
- ignoreLeaks
- growl
- globals
- require

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Peter Halliday  
Licensed under the MIT license.
