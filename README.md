# grunt-mocha-test

[![Build Status](https://travis-ci.org/pghalliday/grunt-mocha-test.png)](https://travis-ci.org/pghalliday/grunt-mocha-test)

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

Here is a simple example gruntfile if you just want to run tests

```javascript
module.exports = function(grunt) {

  // Add our custom tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['test/**/*.js']
      },
  });

  // Default task.
  grunt.registerTask('default', 'mochaTest');
};
```

Here is an example gruntfile that regsisters 2 test tasks, 1 to run the tests and 1 to generate a coverage report using `blanket.js` to instrument the javascript on the fly.

```javascript
module.exports = function(grunt) {

  // Add our custom tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          // Require blanket wrapper here to instrument other required
          // files on the fly. 
          //
          // NB. We cannot require blanket directly as it
          // detects that we are not running mocha cli and loads differently.
          //
          // NNB. As mocha is 'clever' enough to only run the tests once for
          // each file the following coverage task does not actually run any
          // tests which is why the coverage instrumentation has to be done here
          require: 'coverage/blanket'
        },
        src: ['test/**/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          // use the quiet flag to suppress the mocha console output
          quiet: true
        },
        src: ['test/**/*.js'],
        // specify a destination file to capture the mocha
        // output (the quiet option does not suppress this)
        dest: 'coverage.html'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'mochaTest');
};
```

As noted above it is necessary to wrap the blanket require when calling mocha programatically so `coverage/blanket.js` should look something like this.

```javascript
require('blanket')({
  pattern: '/src/'
});
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

- Mock growl binaries so that the growl test actually checks if growl is called
- Figure out why the example doesn't really work (is there a problem with the require option?)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using `npm test`.

## Using Vagrant
To use the Vagrantfile you will also need to install the chef omnibus vagrant plugin

`$ vagrant plugin install vagrant-omnibus`

The node cookbook has been added as a git submodule so you will also have to initialise and update the submodules after cloning the repository

```
$ git submodule init
$ git submodule update
```

## License
Copyright (c) 2012 Peter Halliday  
Licensed under the MIT license.
