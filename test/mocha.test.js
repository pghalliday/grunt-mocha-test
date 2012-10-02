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
		var MochaTask = proxyquire.resolve('../tasks/mocha.js', __dirname, {
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
		var MochaTask = proxyquire.resolve('../tasks/mocha.js', __dirname, {
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

	it('should load mocha options from mochaConfig', function(done) {
		var Module = new ModuleMock();
		var Mocha = mochaMock();
		var MochaTask = proxyquire.resolve('../tasks/mocha.js', __dirname, {
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
		var MochaTask = proxyquire.resolve('../tasks/mocha.js', __dirname, {
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

	it('should expand and add the this.file.src file list to files in Mocha', function(done) {
		var Module = new ModuleMock();
		var Mocha = mochaMock();
		var MochaTask = proxyquire.resolve('../tasks/mocha.js', __dirname, {
				'mocha': Mocha,
				'module': Module
			});
		var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaConfig: {options: 'mocha options'}});
		var mochaTask = new MochaTask(grunt);
		grunt.multiTask.run(function(success) {
			expect(Mocha.files).to.deep.equal(['files', 'file1', 'file2', 'file3', 'file4']);
			done();
		});
	});

	it('should catch and log exceptions thrown by Mocha to the console before failing the task so that it can be run from a watch task', function(done) {
		var Module = new ModuleMock();
		var Mocha = mochaMock(new Error('This is a test'));
		var MochaTask = proxyquire.resolve('../tasks/mocha.js', __dirname, {
				'mocha': Mocha,
				'module': Module
			});
		var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaConfig: {options: 'mocha options'}});
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
		var MochaTask = proxyquire.resolve('../tasks/mocha.js', __dirname, {
				'mocha': Mocha,
				'module': Module
			});
		var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaConfig: {options: 'mocha options'}});
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
		var MochaTask = proxyquire.resolve('../tasks/mocha.js', __dirname, {
				'mocha': Mocha,
				'module': Module
			});
		var grunt = new GruntMock('target', 'files', ['file1', 'file2', 'file3', 'file4'], {mochaConfig: {options: 'mocha options'}});
		var mochaTask = new MochaTask(grunt);
		grunt.multiTask.run(function(success) {
			expect(success).to.equal(true);
			expect(grunt.log.errors.length).to.equal(0);
			done();
		});	});
});