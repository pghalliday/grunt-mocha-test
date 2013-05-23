var grunt = require('grunt');
var fs = require('fs');

var writeCoverageData = function() {
  // write coverage data to a file if it exists
  // this is because the coverage tool does not
  // really work with child processes so we are
  // giving it a helping hand
  if (global._$jscoverage) {
    // we have to create our own structure as the _$jscoverage
    // structure does not stringify to JSON fully as it skips
    // the source property that is added to the array
    var data = {
      sourceArrays: {},
      callCounts: {}
    };
    var src = global._$jscoverage;
    for (var filename in src) {
      var sourceArray = data.sourceArrays[filename] = src[filename].source;
      var callCounts = data.callCounts[filename] = src[filename];
    }
    fs.writeFileSync('jscoverage.json', JSON.stringify(data));
  }
};

// override process.exit so that we can capture jscoverage data in grunt failure cases
var exit = process.exit;
process.exit = function(code) {
  writeCoverageData();
  exit(code);
};

grunt.cli(null, function() {
  writeCoverageData();
});
