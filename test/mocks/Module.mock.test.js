var expect = require('chai').expect,
	ModuleMock = require('./Module.mock');

describe('ModuleMock', function() {
	it('should start with a populated module cache', function() {
		var moduleMock = new ModuleMock();
		expect(moduleMock.isCacheEmpty()).to.equal(false);
	});
	it('module cache should be empty after it has been reset', function() {
		var moduleMock = new ModuleMock();
		moduleMock._cache = {};
		expect(moduleMock.isCacheEmpty()).to.equal(true);
	});
});