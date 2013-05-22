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

Here is an example gruntfile that regsisters 2 test tasks, 1 to run the tests and 1 to generate a coverage report using `blanket.js` to instrument the javascript on the fly.

```javascript
/*global module:false*/
module.exports = function(grunt) {

  // Add our custom tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          require: 'blanket', // require blanket to instrument other required files on the fly
          quiet: true         // use the quiet flag to suppress the mocha console output
        },
        src: ['test/**/*.js'],
        dest: 'coverage.html' // specify a destination file to capture the mocha output (the quiet option does not suppress this)
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
