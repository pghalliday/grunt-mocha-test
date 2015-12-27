var domain = require('domain');
var fs = require('fs');
var path = require('path');
var Mocha = require('mocha');
var hooker = require('hooker');
var mkdirpSync = require('mkdirp').sync; 

function MochaWrapper(params) {
  // If require option is specified then require that file.
  // This code has been adapted from the treatment of the require
  // option in the mocha source (bin/_mocha)
  var cwd = process.cwd();
  var join = path.join;
  var resolve = path.resolve;
  var exists = fs.existsSync;
  module.paths.push(cwd, join(cwd, 'node_modules'));
  if (params.options && params.options.require) {
    var mods = params.options.require instanceof Array ? params.options.require : [params.options.require];
    mods.forEach(function(mod) {
      if (typeof mod === 'string') {
        var abs = exists(mod) || exists(mod + '.js');
        if (abs) {
          mod = resolve(mod);
        }
        require(mod);
      } else if (typeof mod === 'function') {
        mod();
      }
    });
  }

  var mocha = new Mocha(params.options);

  if (params.options.clearRequireCache === true) {
    Object.keys(require.cache).forEach(function (key) {
      delete require.cache[key];
    });
  }

  params.files.forEach(function(file) {
    file.src.forEach(mocha.addFile.bind(mocha));
  });

  this.run = function(callback) {
    try {
      // This hack is a copy of the hack used in
      // https://github.com/gregrperkins/grunt-mocha-hack
      // to work around the issue that mocha lets uncaught exceptions
      // escape and grunt as of version 0.4.x likes to catch uncaught
      // exceptions and exit. It's nasty and requires intimate knowledge
      // of Mocha internals
      if (mocha.files.length) {
        mocha.loadFiles();
      }
      var mochaSuite = mocha.suite;
      var mochaOptions = mocha.options;
      var mochaRunner = new Mocha.Runner(mochaSuite);
      
      var fd;
      mochaRunner.on('end', function(){
        if (params.options.captureFile) {
          mkdirpSync(path.dirname(params.options.captureFile));
          fd = fs.openSync(params.options.captureFile, 'w');
        }
        // Hook process.stdout.write
        hooker.hook(process.stdout, 'write', {
          // This gets executed before the original process.stdout.write
          pre: function(result) {
            // Write result to file if it was opened
            if (fd) {
              fs.writeSync(fd, result);
            }
            
          }
        });
      });
      var mochaReporter = new mocha._reporter(mochaRunner, mochaOptions, mocha);
      mochaRunner.on('end', function(){
        // close the file if it was opened
        if (fd) {
          fs.closeSync(fd);
        }
        // Restore process.stdout.write to its original value
        hooker.unhook(process.stdout, 'write');
      });

      mochaRunner.ignoreLeaks = false !== mochaOptions.ignoreLeaks;
      mochaRunner.asyncOnly = mochaOptions.asyncOnly;
      if (mochaOptions.grep) {
        mochaRunner.grep(mochaOptions.grep, mochaOptions.invert);
      }
      if (mochaOptions.globals) {
        mochaRunner.globals(mochaOptions.globals);
      }
      if (mochaOptions.growl) {
        mocha._growl(mochaRunner, mochaReporter);
      }
      if (mocha.options.colors != null) {
        Mocha.reporters.Base.useColors = mocha.options.colors;
      }

      var runDomain = domain.create();
      runDomain.on('error', mochaRunner.uncaught.bind(mochaRunner));
      runDomain.run(function() {
        mochaRunner.run(function(failureCount) {
          if (mochaReporter.done) {
            mochaReporter.done(failureCount, function(failureCount) {
               callback(null, failureCount);
            });
          } else {
            callback(null, failureCount);
          }
        });
      });
      // I wish I could just do this...
      //
      // mocha.run(function(failureCount) {
      //   callback(null, failureCount);
      // });
    } catch (error) {
      // catch synchronous (uncaught) exceptions thrown as a result
      // of loading the test files so that they can be reported with
      // better details
      callback(error);
    }
  };
}
module.exports = MochaWrapper;
