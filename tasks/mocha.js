/*
 * grunt-mocha-test
 * https://github.com/pghalliday/grunt-mocha-test
 *
 * Copyright (c) 2012 Peter Halliday
 * Licensed under the MIT license.
 */

 module.exports = function(grunt) {
  var Mocha = require('mocha');
  var Module = require('module');

  grunt.registerMultiTask('mochaTest', 'Run node unit tests with Mocha', function() {
    // tell grunt this is an asynchronous task
    var done = this.async();

    // Clear all the files we can in the require cache in case we are run from watch.
    // NB. This is required to ensure that all tests are run and that all the modules under
    // test have been reloaded and are not in some kind of cached state
    for (var key in Module._cache) {
      if (Module._cache[key]) {
        delete Module._cache[key];
        if (Module._cache[key]) {
          grunt.fail.warn('Mocha grunt task: Could not delete from require cache:\n' + key);
        }
      } else {
        grunt.fail.warn('Mocha grunt task: Could not find key in require cache:\n' + key);
      }
    }

    // load the options if they are specified
    var options = grunt.config(['mochaTestConfig', this.target, 'options']);
    if (typeof options !== 'object') {
      options = grunt.config(['mochaTestConfig', 'options']);
    }

    // create a mocha instance with our options
    var mocha = new Mocha(options);

    // if require option is specified then add that file first
    if (options && options.require) {
      mocha.addFile(options.require);
    }

    // add files to mocha
    if(this.file && this.file.src) {
      // grunt 0.3.x
      grunt.file.expandFiles(this.file.src).forEach(function(file) {
        mocha.addFile(file);
      });
    } else {
      // grunt 0.4.x
      this.filesSrc.forEach(function(path) {
        mocha.addFile(path);
      });
    }

    // if invert option is specified then use it
    if (options && typeof(options.invert) !== 'undefined') {
      mocha = mocha.invert(options.invert);
    }    

    // if ignoreLeaks option is specified then use it
    if (options && typeof(options.ignoreLeaks) !== 'undefined') {
      mocha = mocha.ignoreLeaks(options.ignoreLeaks);
    }    

    // if growl option is specified then use it
    if (options && typeof(options.growl) !== 'undefined') {
      mocha = mocha.growl(options.growl);
    }    

    // if globals option is specified then use it
    if (options && typeof(options.globals) !== 'undefined') {
      mocha = mocha.globals(options.globals);
    }    

    // run mocha asynchronously and catch errors!! (again, in case we are running this task in watch)
    try {
      mocha.run(function(failureCount) {
        done(failureCount === 0);
      });
    } catch (e) {
      grunt.log.error('Mocha exploded!');
      grunt.log.error(e.stack);
      done(false);
    }
  });
};
