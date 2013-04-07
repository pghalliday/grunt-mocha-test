/*global testVar:false */

var proxyquire = require('proxyquire'),
  mochaMock = require('./mocks/Mocha.mock'),
  ModuleMock = require('./mocks/Module.mock'),
  GruntMock = require('./mocks/Grunt.mock'),
  expect = require('chai').expect;

describe('mocha grunt task', function(){
  it('should register a multi task', function() {
    var MochaTask = require('../tasks/mocha.js');
    var grunt = new GruntMock();
    var mochaTask = new MochaTask(grunt);
    expect(grunt.multiTask.name).to.equal('mochaTest');
    expect(grunt.multiTask.description).to.equal('Run node unit tests with Mocha');
    expect(grunt.multiTask.callback).to.be.a('function');
  });

  it('should run asynchronously', function(done) {
    var MochaTask = proxyquire('../tasks/mocha.js', {
        'mocha': mochaMock(),
        'module': new ModuleMock()
      });
    var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4']);
    var mochaTask = new MochaTask(grunt);
    grunt.multiTask.run(function(success) {
      expect(grunt.multiTask.asynchronous).to.equal(true);
      done();
    });
  });

  it('should clear the require cache before sending tests to mocha so that it can be run from a watch task', function(done) {
    var Module = new ModuleMock();
    var MochaTask = proxyquire('../tasks/mocha.js', {
        'mocha': mochaMock(),
        'module': Module
      });
    var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4']);
    var mochaTask = new MochaTask(grunt);
    grunt.multiTask.run(function(success) {
      expect(Module.isCacheEmpty()).to.equal(true);
      done();
    });
  });

  it('should load mocha options from mochaTestConfig', function(done) {
    var Module = new ModuleMock();
    var Mocha = mochaMock();
    var MochaTask = proxyquire('../tasks/mocha.js', {
        'mocha': Mocha,
        'module': Module
      });
    var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaTestConfig: {options: 'mocha options'}});
    var mochaTask = new MochaTask(grunt);
    grunt.multiTask.run(function(success) {
      expect(Mocha.options).to.equal('mocha options');
      done();
    });
  });

  it('should use named config where available', function(done) {
    var Module = new ModuleMock();
    var Mocha = mochaMock();
    var MochaTask = proxyquire('../tasks/mocha.js', {
        'mocha': Mocha,
        'module': Module
      });
    var grunt = new GruntMock('target', 'files', [
        'file1',
        'file2',
        'file3',
        'file4'
      ], {
        mochaTestConfig: {
          options: {
            text: 'mocha options'
          },
          target: {
            options: {
              text: 'mocha target options'
            }
          }
        }
      });
    var mochaTask = new MochaTask(grunt);
    grunt.multiTask.run(function(success) {
      expect(Mocha.options).to.deep.equal({text: 'mocha target options'});
      done();
    });
  });

  it('should expand and add the file list to files in Mocha', function(done) {
    var Module = new ModuleMock();
    var Mocha = mochaMock();
    var MochaTask = proxyquire('../tasks/mocha.js', {
        'mocha': Mocha,
        'module': Module
      });
    var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaTestConfig: {options: 'mocha options'}});
    var mochaTask = new MochaTask(grunt);
    grunt.multiTask.run(function(success) {
      expect(Mocha.files).to.deep.equal(['files', 'file1', 'file2', 'file3', 'file4']);
      done();
    });
  });

  it('should catch and log exceptions thrown by Mocha to the console before failing the task so that it can be run from a watch task', function(done) {
    var Module = new ModuleMock();
    var Mocha = mochaMock(new Error('This is a test'));
    var MochaTask = proxyquire('../tasks/mocha.js', {
        'mocha': Mocha,
        'module': Module
      });
    var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaTestConfig: {options: 'mocha options'}});
    var mochaTask = new MochaTask(grunt);
    grunt.multiTask.run(function(success) {
      expect(success).to.equal(false);
      expect(grunt.log.errors[0]).to.equal('Mocha exploded!');
      expect(grunt.log.errors[1]).to.be.a('string');
      done();
    });
  });

  it('should fail if any tests fail', function(done) {
    var Module = new ModuleMock();
    var Mocha = mochaMock(1);
    var MochaTask = proxyquire('../tasks/mocha.js', {
        'mocha': Mocha,
        'module': Module
      });
    var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaTestConfig: {options: 'mocha options'}});
    var mochaTask = new MochaTask(grunt);
    grunt.multiTask.run(function(success) {
      expect(success).to.equal(false);
      expect(grunt.log.errors.length).to.equal(0);
      done();
    });
  });

  it('should succeed if no tests fail', function(done) {
    var Module = new ModuleMock();
    var Mocha = mochaMock();
    var MochaTask = proxyquire('../tasks/mocha.js', {
        'mocha': Mocha,
        'module': Module
      });
    var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaTestConfig: {options: 'mocha options'}});
    var mochaTask = new MochaTask(grunt);
    grunt.multiTask.run(function(success) {
      expect(success).to.equal(true);
      expect(grunt.log.errors.length).to.equal(0);
      done();
    });
  });

  it('should add a single file added to the require option', function(done) {
      var Module = new ModuleMock();
      var Mocha = mochaMock();
      var MochaTask = proxyquire('../tasks/mocha.js', {
          'mocha': Mocha,
          'module': Module
      });
      var grunt = new GruntMock(
          'target',
          'files', [
              'file1',
              'file2',
              'file3',
              'file4'
          ], {
              mochaTestConfig: {
                  options: {
                      require: 'myfile'
                  }
              }
          }
      );
      var mochaTask = new MochaTask(grunt);
      grunt.multiTask.run(function(success) {
          expect(Mocha.files).to.deep.equal(['myfile', 'files', 'file1', 'file2', 'file3', 'file4']);
          done();
      });
  });

  it('should expose global variables from the file added with the require option', function() {
      // Note, this is not using mocks but is configured as a require in grunt.js
      // feels like a hack but it proves the functionality pretty well
      expect(testVar).to.equal('hello');
  });

  describe('invert option', function() {
    it('should not call the invert chainable function by default', function(done) {
      var Module = new ModuleMock();
      var Mocha = mochaMock();
      var MochaTask = proxyquire('../tasks/mocha.js', {
          'mocha': Mocha,
          'module': Module
        });
      var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaTestConfig: {options: 'mocha options'}});
      var mochaTask = new MochaTask(grunt);
      grunt.multiTask.run(function(success) {
        expect(Mocha.invert).to.be.an('undefined');
        done();
      });
    });
    it('should pass through the invert option to the invert chainable function', function(done) {
      var Module = new ModuleMock();
      var Mocha = mochaMock();
      var MochaTask = proxyquire('../tasks/mocha.js', {
          'mocha': Mocha,
          'module': Module
        });
      var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaTestConfig: {options: {invert: 'invert option'}}});
      var mochaTask = new MochaTask(grunt);
      grunt.multiTask.run(function(success) {
        expect(Mocha.invert).to.equal('invert option');
        done();
      });
    });
  });

  describe('ignoreLeaks option', function() {
    it('should not call the ignoreLeaks chainable function by default', function(done) {
      var Module = new ModuleMock();
      var Mocha = mochaMock();
      var MochaTask = proxyquire('../tasks/mocha.js', {
          'mocha': Mocha,
          'module': Module
        });
      var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaTestConfig: {options: 'mocha options'}});
      var mochaTask = new MochaTask(grunt);
      grunt.multiTask.run(function(success) {
        expect(Mocha.ignoreLeaks).to.be.an('undefined');
        done();
      });
    });
    it('should pass through the ignoreLeaks option to the ignoreLeaks chainable function', function(done) {
      var Module = new ModuleMock();
      var Mocha = mochaMock();
      var MochaTask = proxyquire('../tasks/mocha.js', {
          'mocha': Mocha,
          'module': Module
        });
      var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaTestConfig: {options: {ignoreLeaks: 'ignoreLeaks option'}}});
      var mochaTask = new MochaTask(grunt);
      grunt.multiTask.run(function(success) {
        expect(Mocha.ignoreLeaks).to.equal('ignoreLeaks option');
        done();
      });
    });
  });

  describe('growl option', function() {
    it('should not call the growl chainable function by default', function(done) {
      var Module = new ModuleMock();
      var Mocha = mochaMock();
      var MochaTask = proxyquire('../tasks/mocha.js', {
          'mocha': Mocha,
          'module': Module
        });
      var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaTestConfig: {options: 'mocha options'}});
      var mochaTask = new MochaTask(grunt);
      grunt.multiTask.run(function(success) {
        expect(Mocha.growl).to.be.an('undefined');
        done();
      });
    });
    it('should pass through the growl option to the growl chainable function', function(done) {
      var Module = new ModuleMock();
      var Mocha = mochaMock();
      var MochaTask = proxyquire('../tasks/mocha.js', {
          'mocha': Mocha,
          'module': Module
        });
      var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaTestConfig: {options: {growl: 'growl option'}}});
      var mochaTask = new MochaTask(grunt);
      grunt.multiTask.run(function(success) {
        expect(Mocha.growl).to.equal('growl option');
        done();
      });
    });
  });

  describe('globals option', function() {
    it('should not call the globals chainable function by default', function(done) {
      var Module = new ModuleMock();
      var Mocha = mochaMock();
      var MochaTask = proxyquire('../tasks/mocha.js', {
          'mocha': Mocha,
          'module': Module
        });
      var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaTestConfig: {options: 'mocha options'}});
      var mochaTask = new MochaTask(grunt);
      grunt.multiTask.run(function(success) {
        expect(Mocha.globals).to.be.an('undefined');
        done();
      });
    });
    it('should pass through the globals option to the globals chainable function', function(done) {
      var Module = new ModuleMock();
      var Mocha = mochaMock();
      var MochaTask = proxyquire('../tasks/mocha.js', {
          'mocha': Mocha,
          'module': Module
        });
      var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaTestConfig: {options: {globals: 'globals option'}}});
      var mochaTask = new MochaTask(grunt);
      grunt.multiTask.run(function(success) {
        expect(Mocha.globals).to.equal('globals option');
        done();
      });
    });
  });

  describe('with grunt 0.4.x', function() {
    it('should expand and add the file list to files in Mocha', function(done) {
      var Module = new ModuleMock();
      var Mocha = mochaMock();
      var MochaTask = proxyquire('../tasks/mocha.js', {
          'mocha': Mocha,
          'module': Module
        });
      var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaTestConfig: {options: 'mocha options'}}, "0.4.x");
      var mochaTask = new MochaTask(grunt);
      grunt.multiTask.run(function(success) {
        expect(Mocha.files).to.deep.equal(['files', 'file1', 'file2', 'file3', 'file4']);
        done();
      });
    });
  });
});