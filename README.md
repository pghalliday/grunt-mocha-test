# grunt-mocha-test

[![Build Status](https://travis-ci.org/pghalliday/grunt-mocha-test.png)](https://travis-ci.org/pghalliday/grunt-mocha-test)

A grunt task for running server side mocha tests

## Usage

Install next to your project's Gruntfile.js with: 

```
$ npm install grunt-mocha-test
```

### Running tests

Here is a simple example gruntfile if you just want to run tests

```javascript
module.exports = function(grunt) {

  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['test/**/*.js']
      },
  });

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

### Generating coverage reports

Here is an example gruntfile that registers 2 test tasks, 1 to run the tests and 1 to generate a coverage report using `blanket.js` to instrument the javascript on the fly.

```
$ npm install blanket
```

```javascript
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');

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

  grunt.registerTask('default', 'mochaTest');
};
```

As noted above it is necessary to wrap the blanket require when calling mocha programatically so `coverage/blanket.js` should look something like this.

```javascript
require('blanket')({
  // Only files that match the pattern will be instrumented
  pattern: '/src/'
});
```

### Failing tests if a coverage threshold is not reached

Building on the previous example, if you wish to have your tests fail if it falls below a certain coverage threshold then I advise using the `travis-cov` reporter

```
$ npm install travis-cov
```

```javascript
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'coverage/blanket'
        },
        src: ['test/**/*.js']
      },
      'html-cov': {
        options: {
          reporter: 'html-cov',
          quiet: true
        },
        src: ['test/**/*.js'],
        dest: 'coverage.html'
      },
      // The travis-cov reporter will fail the tests if the
      // coverage falls below the threshold configured in package.json
      'travis-cov': {
        options: {
          reporter: 'travis-cov'
        },
        src: ['test/**/*.js']
      }
    }
  });

  grunt.registerTask('default', 'mochaTest');
};
```

Don't forget to update `package.json` with options for `travis-cov`, for example:

```javascript
  ...

  "scripts": {
    "test": "grunt",
    "travis-cov": {
      // Yes, I like to set the coverage threshold to 100% ;)
      "threshold": 100
    }
  },

  ...
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using: 

```
$ npm test
```

### Using Vagrant
To use the Vagrantfile you will also need to install the chef omnibus vagrant plugin

```
$ vagrant plugin install vagrant-omnibus
```


## License
Copyright (c) 2013 Peter Halliday  
Licensed under the MIT license.
