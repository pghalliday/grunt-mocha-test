# grunt-mocha-test

[![Build Status](https://travis-ci.org/pghalliday/grunt-mocha-test.svg)](https://travis-ci.org/pghalliday/grunt-mocha-test)
[![Coverage Status](https://img.shields.io/coveralls/pghalliday/grunt-mocha-test.svg)](https://coveralls.io/r/pghalliday/grunt-mocha-test?branch=master)
[![Dependency Status](https://david-dm.org/pghalliday/grunt-mocha-test.svg?theme=shields.io)](https://david-dm.org/pghalliday/grunt-mocha-test)
[![devDependency Status](https://david-dm.org/pghalliday/grunt-mocha-test/dev-status.svg?theme=shields.io)](https://david-dm.org/pghalliday/grunt-mocha-test#info=devDependencies)
[![peerDependency Status](https://david-dm.org/pghalliday/grunt-mocha-test/peer-status.svg?theme=shields.io)](https://david-dm.org/pghalliday/grunt-mocha-test#info=peerDependencies)

A grunt task for running server side mocha tests

## Usage

Install next to your project's Gruntfile.js with: 

```
npm install grunt-mocha-test --save-dev
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
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          clearCacheFilter: (key) => true, // Optionally defines which files should keep in cache
          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },
        src: ['test/**/*.js']
      }
    }
  });

  grunt.registerTask('default', 'mochaTest');

};
```

### Options

The following options are specific to `grunt-mocha-test` (ie. not mocha options)

- `captureFile` - specify a file to capture all output to (will include any output from `console.log`)
- `quiet` - `true` to not output anything to console (normally used with the `captureFile` option when console output would not be human readable)
- `clearRequireCache` - `true` to clear the require cache before each test run (normally used with watch when not spawning each test run in a new `nodejs` context)
- `clearCacheFilter` - `function() { return true/false }` to say which files should remain in cache. Only works with `clearRequireCache` set to `true`)
- `noFail` - `true` to prevent the task failing on failed tests. Useful for CI setups where test reports are processed separately. Will still fail on other errors

The following mocha options have also been tested (others may have been added since the time of writing through changes to mocha)

- grep
- ui
- reporter
- timeout
- invert
- ignoreLeaks
- growl
- globals
- bail
- require
- slow

### Specifying compilers

The Mocha `--compilers` option is almost identical to the `--require` option but with additional functionality for use with the Mocha `--watch` mode. As the `--watch` mode is not relevant for this plugin there is no need to implement a separate `compilers` option and actually the `require` option should be used instead.

The following example shows the use of the CoffeeScript compiler.

```
npm install coffee-script
```

```javascript
mochaTest: {
  test: {
    options: {
      reporter: 'spec',
      require: 'coffee-script/register'
    },
    src: ['test/**/*.coffee']
  }
}
```

This is an example for the Babel 6 compiler ([babel must be configured](https://babeljs.io/docs/setup/) separately if you want to use it for something like ES6/ES2015).

```
npm install babel-register
```

```javascript
mochaTest: {
  test: {
    options: {
      reporter: 'spec',
      require: 'babel-register'
    },
    src: ['test/**/*.js']
  }
}
```

In order to make this more user friendly, the `require` option can take either a single file/function or an array of files/functions in case you have other globals you wish to require.

eg.

```javascript
mochaTest: {
  test: {
    options: {
      reporter: 'spec',
      require: [
        'coffee-script/register',
        './globals.js',
        function(){ testVar1=require('./stuff'); },
        function(){ testVar2='other-stuff'; }
      ]
    },
    src: ['test/**/*.coffee']
  }
}
```

NB. File references for the `require` option can only be used with Javascript files, ie. it is not possible to specify a `./globals.coffee` in the above example.

### Specifying a Mocha module

`grunt-mocha-test` uses npm's `peerDependency` functionality and thus uses whatever version
of `mocha` is installed in your project. If your project does not have `mocha` installed, a compatible
version will automatically be installed when adding `grunt-mocha-test`.

### Generating coverage reports

Here is an example gruntfile that registers 2 test tasks, 1 to run the tests and 1 to generate a coverage report using `blanket.js` to instrument the javascript on the fly.

```
npm install blanket
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
          quiet: true,
          // specify a destination file to capture the mocha
          // output (the quiet option does not suppress this)
          captureFile: 'coverage.html'
        },
        src: ['test/**/*.js']
      }
    }
  });

  grunt.registerTask('default', 'mochaTest');
};
```

As noted above it is necessary to wrap the blanket require when calling mocha programatically so `coverage/blanket.js` should look something like this.

```javascript
var path = require('path');
var srcDir = path.join(__dirname, '..', 'src');

require('blanket')({
  // Only files that match the pattern will be instrumented
  pattern: srcDir
});
```

This will preprocess all `.js` files in the `src` directory. Note that `Blanket` just uses pattern matching so this rework of the paths prevents files in `node_modules` being instrumented too. Also bear in mind using `Blanket` to instrument files on the fly only works if the file is not already in the require cache (this is an odd case but if you can't figure out why a file is not instrumented and the `pattern` looks ok then this may be the cause).

### Failing tests if a coverage threshold is not reached

Building on the previous example, if you wish to have your tests fail if it falls below a certain coverage threshold then I advise using the `travis-cov` reporter

```
npm install travis-cov
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
          quiet: true,
          captureFile: 'coverage.html'
        },
        src: ['test/**/*.js']
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

  "config": {
    "travis-cov": {
      // Yes, I like to set the coverage threshold to 100% ;)
      "threshold": 100
    }
  },

  ...
```

### Instrumenting source files with coverage data before running tests


In most cases it may be more useful to instrument files before running tests. This has the added advantage of creating intermediate files that will match the line numbers reported in exception reports. Here is one possible `Gruntfile.js` that uses the `grunt-blanket` plug in.

```
npm install grunt-contrib-clean
npm install grunt-contrib-copy
npm install grunt-blanket
npm install travis-cov
```

```javascript
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-blanket');

  grunt.initConfig({
    clean: {
      coverage: {
        src: ['coverage/']
      }
    },
    copy: {
      coverage: {
        src: ['test/**'],
        dest: 'coverage/'
      }
    },
    blanket: {
      coverage: {
        src: ['src/'],
        dest: 'coverage/src/'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['/coverage/test/**/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'coverage.html'
        },
        src: ['/coverage/test/**/*.js']
      },
      'travis-cov': {
        options: {
          reporter: 'travis-cov'
        },
        src: ['/coverage/test/**/*.js']
      }
    }
  });

  grunt.registerTask('default', ['clean', 'blanket', 'copy', 'mochaTest']);
};
```

This will delete any previously instrumented files, copy the `test` files to a `coverage` folder and instrument the `src` javascript files to the `coverage` folder. Lastly it runs tests from the `coverage` folder. It's more complicated but often easier to work with.

### Running in permanent environments (like watch)

If you run `grunt-mocha-test` with `grunt-contrib-watch` using the `spawn: false` option, you will notice that the tests only run on the first change. Subsequent changes will result in an empty report with a `0 passing` message.

This happens because `mocha` loads your tests using `require` resulting in them being added to the require cache. Thus once they have been loaded in a process the subsequent calls to `require` hit the cache without executing the code again. To prevent this from happening, use the `clearRequireCache` option (default value is `false`).

Here is an example that also demonstrates how to only run changed tests:

```javascript
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: true
        },
        src: ['test/**/*.js']
      },
    },

    watch: {
      js: {
        options: {
          spawn: false,
        },
        files: '**/*.js',
        tasks: ['default']
      }
    }
  });

  // On watch events, if the changed file is a test file then configure mochaTest to only
  // run the tests from that file. Otherwise run all the tests
  var defaultTestSrc = grunt.config('mochaTest.test.src');
  grunt.event.on('watch', function(action, filepath) {
    grunt.config('mochaTest.test.src', defaultTestSrc);
    if (filepath.match('test/')) {
      grunt.config('mochaTest.test.src', filepath);
    }
  });

  grunt.registerTask('default', 'mochaTest');
};
```

### Using node flags

There are some flags that Mocha supports that are actually Node flags, eg.

- --debug
- --harmony-generators

It is currently not possible to set these at runtime when using Mocha as a library and as such cannot be supported by `grunt-mocha-test` without a major refactor (and severe impact on performance as it would involve spawning processes).

The recommended way of using these flags would be to pass them to node when starting the grunt process. The simplest way to do this would be to leverage the [`scripts`](https://www.npmjs.org/doc/misc/npm-scripts.html) functionality of NPM and `package.json`.

```
  ...
  },
  "scripts": {
    "test": "node --debug --harmony-generators ./node_modules/.bin/grunt test"
  }
  ...
```

The tests would then be run using

```
npm test
```

Note that this assumes that `grunt-cli` has been installed locally and not globally

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using: 

```
npm test
```

## License
Copyright &copy; 2016 Peter Halliday  
Licensed under the MIT license.

[![Donate Bitcoins](http://i.imgur.com/b5BZsFH.png)](bitcoin:17LtnRG4WxRLYBWzrBoEKP3F7fZx8vcAsK?amount=0.01&label=grunt-mocha-test)

[17LtnRG4WxRLYBWzrBoEKP3F7fZx8vcAsK](bitcoin:17LtnRG4WxRLYBWzrBoEKP3F7fZx8vcAsK?amount=0.01&label=grunt-mocha-test)
