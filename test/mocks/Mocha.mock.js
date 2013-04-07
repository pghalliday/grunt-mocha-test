module.exports = function(result) {
	var constructor = function(options) {
		constructor.options = options;
		constructor.files = [];
		this.addFile = function(file) {
			constructor.files.push(file);
		};
		this.run = function(callback) {
			if (result instanceof Error) {
				throw result;
			} else if (typeof result === 'number') {
				callback(result);
			} else {
				callback(0);
			}
		};
		this.invert = function(option) {
			constructor.invert = option;
			return this;
		};
		this.ignoreLeaks = function(option) {
			constructor.ignoreLeaks = option;
			return this;
		};
		this.growl = function(option) {
			constructor.growl = option;
			return this;
		};
		this.globals = function(option) {
			constructor.globals = option;
			return this;
		};
	};
	return constructor;
};
