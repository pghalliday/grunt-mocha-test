var expect = require('chai').expect,
	mochaMock = require('./Mocha.mock');

describe('MochaMock', function() {
	it('should remember the last options we initialise an object with so that we can test them later', function() {
		var MochaMock = mochaMock();
		var mocha = new MochaMock({option: 'my option'});
		expect(MochaMock.options).to.deep.equal({option: 'my option'});
	});
	it('should remember the last files we added to an instance so that we can check them later', function() {
		var MochaMock = mochaMock();
		var mocha = new MochaMock();
		mocha.addFile('banana');
		mocha.addFile('apple');
		mocha.addFile('pear');
		expect(MochaMock.files).to.deep.equal(['banana', 'apple', 'pear']);
	});
	it('should return a failure count of zero by default when run is called', function(done) {
		var MochaMock = mochaMock();
		var mocha = new MochaMock();
		mocha.run(function(failureCount) {
			expect(failureCount).to.equal(0);
			done();
		});
	});
	it('should return the failure count we previously specified when run is called', function(done) {
		var MochaMock = mochaMock(10);
		var mocha = new MochaMock();
		mocha.run(function(failureCount) {
			expect(failureCount).to.equal(10);
			done();
		});
	});
	it('should throw the error we previously specified when run is called', function(done) {
		var MochaMock = mochaMock(new Error('This is a test'));
		var mocha = new MochaMock();
		try {
			mocha.run(function(failureCount) {});
		} catch(error) {
			expect(error.toString()).to.equal((new Error('This is a test')).toString());
			done();
		}
	});
	describe('invert support', function() {
		it('should record invert parameter if called', function(done) {
			var MochaMock = mochaMock();
			var mocha = new MochaMock();
			mocha.invert('invert option').run(function(failureCount) {
				expect(MochaMock.invert).to.equal('invert option');
				done();
			});
		});
		it('invert property should be undefined if not called', function(done) {
			var MochaMock = mochaMock();
			var mocha = new MochaMock();
			mocha.run(function(failureCount) {
				expect(MochaMock.invert).to.be.an('undefined');
				done();
			});
		});
	});
	describe('ignoreLeaks support', function() {
		it('should record ignoreLeaks parameter if called', function(done) {
			var MochaMock = mochaMock();
			var mocha = new MochaMock();
			mocha.ignoreLeaks('ignoreLeaks option').run(function(failureCount) {
				expect(MochaMock.ignoreLeaks).to.equal('ignoreLeaks option');
				done();
			});
		});
		it('ignoreLeaks property should be undefined if not called', function(done) {
			var MochaMock = mochaMock();
			var mocha = new MochaMock();
			mocha.run(function(failureCount) {
				expect(MochaMock.ignoreLeaks).to.be.an('undefined');
				done();
			});
		});
	});
	describe('growl support', function() {
		it('should record growl parameter if called', function(done) {
			var MochaMock = mochaMock();
			var mocha = new MochaMock();
			mocha.growl('growl option').run(function(failureCount) {
				expect(MochaMock.growl).to.equal('growl option');
				done();
			});
		});
		it('growl property should be undefined if not called', function(done) {
			var MochaMock = mochaMock();
			var mocha = new MochaMock();
			mocha.run(function(failureCount) {
				expect(MochaMock.growl).to.be.an('undefined');
				done();
			});
		});
	});
	describe('globals support', function() {
		it('should record globals parameter if called', function(done) {
			var MochaMock = mochaMock();
			var mocha = new MochaMock();
			mocha.globals('globals option').run(function(failureCount) {
				expect(MochaMock.globals).to.equal('globals option');
				done();
			});
		});
		it('globals property should be undefined if not called', function(done) {
			var MochaMock = mochaMock();
			var mocha = new MochaMock();
			mocha.run(function(failureCount) {
				expect(MochaMock.globals).to.be.an('undefined');
				done();
			});
		});
	});
});