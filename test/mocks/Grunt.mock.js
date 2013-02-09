module.exports = function(target, src, filesExpanded, config, version) {

	this.multiTask = {
		file: {},
		target: target,
		asynchronous: false,
		async: function() {
			this.asynchronous = true;
			var complete = this.complete;
			return function(success) {
				complete(success);
			};
		},
		run: function(complete) {
			this.complete = complete;
			var success = this.callback();
			if (!this.asynchronous) {
				complete(success);
			}
		}
	};

	this.registerMultiTask = function(name, description, callback) {
		this.multiTask.name = name;
		this.multiTask.description = description;
		this.multiTask.callback = callback;
	};
	this.config = function(search) {
		var value = config;
		search.forEach(function(field) {
			if (value) {
				value = value[field];
			}
		});
		return value;
	};
	this.file = {
		expandFiles: function(pattern) {
			return [pattern].concat(filesExpanded);
		}
	};
	this.log = {
		errors: [],
		error: function(msg) {
			this.errors.push(msg);
		}
	};

	if (version === '0.4.x') {
		this.multiTask.filesSrc = this.file.expandFiles(src);
	} else {
		this.multiTask.file.src = src;
	}
};