# grunt-mocha-test

A grunt task for running server side mocha tests

## Getting Started
Install this grunt plugin next to your project's [Gruntfile.js gruntfile][getting_started] with: `npm install grunt-mocha-test`

Then add this line to your project's `Gruntfile.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-mocha-test');
```

[grunt]: http://gruntjs.com
[getting_started]: http://gruntjs.com/getting-started

## Documentation

```javascript
/*global module:false*/
module.exports = function(grunt) {

  // Add our custom tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      options: {
        reporter: 'nyan'
      },
      normal: {
        src: ['test/**/*.test.js']
      },
      withTimeout: {
        options: {
          timeout: 1000     
        }
        src: ['test-timeout/**/*.test.js']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'mochaTest:normal');
  grunt.registerTask('testWithTimeout', 'mochaTest:withTimeout');
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

## Roadmap

- Catch asynchronous require exceptions so that grunt does not exit early
- Test the growl option

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Using Vagrant
To use the Vagrantfile you will also need to install the chef omnibus vagrant plugin

`$ vagrant plugin install vagrant-omnibus`

The node cookbook has been added as a git submodule so you will also have to initialise and update the submodules after cloning the repository

```
$ git submodule init
$ git submodule update
```

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Peter Halliday  
Licensed under the MIT license.
