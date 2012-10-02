module.exports = function() {
	this._cache = {};
	for (var index = 0; index < 100; index++) {
		this._cache['Key ' + index] = 'Value' + index;
	}

	this.isCacheEmpty = function() {
		return (Object.keys(this._cache).length === 0);
	};
};
