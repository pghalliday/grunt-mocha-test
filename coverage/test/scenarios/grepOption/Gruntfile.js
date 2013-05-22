if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['test/scenarios/grepOption/Gruntfile.js'] === 'undefined'){_$jscoverage['test/scenarios/grepOption/Gruntfile.js']=[];
_$jscoverage['test/scenarios/grepOption/Gruntfile.js'].source=['module.exports = function(grunt) {',
'  // Add our custom tasks.',
'  grunt.loadTasks(\'../../../tasks\');',
'',
'  // Project configuration.',
'  grunt.initConfig({',
'    mochaTest: {',
'      options: {',
'        reporter: \'spec\',',
'        grep: \'tests that match grep\'',
'      },',
'      all: {',
'        src: [\'*.js\']',
'      }',
'    }',
'  });',
'',
'  // Default task.',
'  grunt.registerTask(\'default\', [\'mochaTest\']);',
'};',
''];
_$jscoverage['test/scenarios/grepOption/Gruntfile.js'][1]=0;
_$jscoverage['test/scenarios/grepOption/Gruntfile.js'][3]=0;
_$jscoverage['test/scenarios/grepOption/Gruntfile.js'][6]=0;
_$jscoverage['test/scenarios/grepOption/Gruntfile.js'][19]=0;
}_$jscoverage['test/scenarios/grepOption/Gruntfile.js'][1]++;
module.exports = function(grunt) {
  // Add our custom tasks.
  _$jscoverage['test/scenarios/grepOption/Gruntfile.js'][3]++;
grunt.loadTasks('../../../tasks');

  // Project configuration.
  _$jscoverage['test/scenarios/grepOption/Gruntfile.js'][6]++;
grunt.initConfig({
    mochaTest: {
      options: {
        reporter: 'spec',
        grep: 'tests that match grep'
      },
      all: {
        src: ['*.js']
      }
    }
  });

  // Default task.
  _$jscoverage['test/scenarios/grepOption/Gruntfile.js'][19]++;
grunt.registerTask('default', ['mochaTest']);
};
