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
	};
	return constructor;
};
