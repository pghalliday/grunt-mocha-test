var domain = require('domain');
var fs = require('fs');
var path = require('path');
var Mocha = require('mocha');

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
      mocha.run(function(failureCount) {
        callback(null, failureCount);
      });
    } catch (error) {
      // catch synchronous (uncaught) exceptions thrown as a result
      // of loading the test files so that they can be reported with
      // better details
      callback(error);
    }
  };
}
module.exports = MochaWrapper;
