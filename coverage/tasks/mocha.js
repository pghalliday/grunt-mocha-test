if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['tasks/mocha.js'] === 'undefined'){_$jscoverage['tasks/mocha.js']=[];
_$jscoverage['tasks/mocha.js'].source=['module.exports = function(grunt) {',
'  var MochaWrapper = require(\'./lib/MochaWrapper\');',
'',
'  grunt.registerMultiTask(\'mochaTest\', \'Run node unit tests with Mocha\', function() {',
'    var done = this.async();',
'    var mochaWrapper = new MochaWrapper({',
'      files: this.filesSrc,',
'      options: this.options()',
'    });',
'    mochaWrapper.run(function(error, failureCount) {',
'      if (error) {',
'        grunt.log.error(\'Mocha exploded!\');',
'        grunt.log.error(error.stack);',
'        done(false);',
'      } else {',
'        done(failureCount === 0);',
'      }',
'    });',
'  });',
'};',
''];
_$jscoverage['tasks/mocha.js'][14]=0;
_$jscoverage['tasks/mocha.js'][1]=0;
_$jscoverage['tasks/mocha.js'][2]=0;
_$jscoverage['tasks/mocha.js'][4]=0;
_$jscoverage['tasks/mocha.js'][5]=0;
_$jscoverage['tasks/mocha.js'][6]=0;
_$jscoverage['tasks/mocha.js'][10]=0;
_$jscoverage['tasks/mocha.js'][11]=0;
_$jscoverage['tasks/mocha.js'][12]=0;
_$jscoverage['tasks/mocha.js'][13]=0;
_$jscoverage['tasks/mocha.js'][16]=0;
}_$jscoverage['tasks/mocha.js'][1]++;
module.exports = function(grunt) {
  _$jscoverage['tasks/mocha.js'][2]++;
var MochaWrapper = require('./lib/MochaWrapper');

  _$jscoverage['tasks/mocha.js'][4]++;
grunt.registerMultiTask('mochaTest', 'Run node unit tests with Mocha', function() {
    _$jscoverage['tasks/mocha.js'][5]++;
var done = this.async();
    _$jscoverage['tasks/mocha.js'][6]++;
var mochaWrapper = new MochaWrapper({
      files: this.filesSrc,
      options: this.options()
    });
    _$jscoverage['tasks/mocha.js'][10]++;
mochaWrapper.run(function(error, failureCount) {
      _$jscoverage['tasks/mocha.js'][11]++;
if (error) {
        _$jscoverage['tasks/mocha.js'][12]++;
grunt.log.error('Mocha exploded!');
        _$jscoverage['tasks/mocha.js'][13]++;
grunt.log.error(error.stack);
        _$jscoverage['tasks/mocha.js'][14]++;
done(false);
      } else {
        _$jscoverage['tasks/mocha.js'][16]++;
done(failureCount === 0);
      }
    });
  });
};
