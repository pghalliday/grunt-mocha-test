var expect = require('chai').expect,
	GruntMock = require('./Grunt.mock');

describe('GruntMock', function() {
	it('should remember the name, description and callback of last multi task registered so that we can check them later', function() {
		var grunt = new GruntMock();
		var callback = function() {};
		grunt.registerMultiTask('test', 'description', callback);
		expect(grunt.multiTask.name).to.equal('test');
		expect(grunt.multiTask.description).to.equal('description');
		expect(grunt.multiTask.callback).to.equal(callback);
	});
	it('should call the callback with the correct target and file properties set when the multitask is run', function(done) {
		var grunt = new GruntMock('target', 'file');
		var callback = function() {
			expect(this.target).to.equal('target');
			expect(this.file.src).to.equal('file');
			return true;
		};
		grunt.registerMultiTask('test', 'description', callback);
		grunt.multiTask.run(function(success) {			
			expect(success).to.equal(true);
			expect(grunt.multiTask.asynchronous).to.equal(false);
			done();
		});
	});
	it('should support asynchronous tasks', function(done) {
		var grunt = new GruntMock();
		var callback = function() {
			var complete = this.async();
			complete(true);
		};
		grunt.registerMultiTask('test', 'description', callback);
		grunt.multiTask.run(function(success) {
			expect(success).to.equal(true);
			expect(grunt.multiTask.asynchronous).to.equal(true);
			done();
		});
	});
	it('should have a file property with an expandFiles method that returns an array of file names beginning with the pattern string', function() {
		var grunt = new GruntMock(null, "null", ['file1', 'file2', 'file3']);
		expect(grunt.file.expandFiles('some text')).to.deep.equal(['some text', 'file1', 'file2', 'file3']);
	});
	it('should have a log property with an error function to log errors that we can check later', function() {
		var grunt = new GruntMock();
		grunt.log.error('hello');
		grunt.log.error('goodbye');
		expect(grunt.log.errors).to.deep.equal(['hello', 'goodbye']);
	});
	describe('#config', function() {
		it('should search supplied config by array terms', function() {
			var grunt = new GruntMock(null, null, null, {
				myConfig: {
					myField: {
						mySubField: 'hello'
					}
				}
			});
			expect(grunt.config(['myConfig', 'myField', 'mySubField'])).to.equal('hello');
		});
	});
});