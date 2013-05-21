var doesNotExist;
process.nextTick(function() {
  doesNotExist = require('doesNotExist');
});

var waitForDoesNotExist = function(callback) {
  if (doesNotExist) {
    callback();
  } else {
    process.nextTick(function() {
      waitForDoesNotExist(callback);
    });
  }
};

describe('test', function() {
  it('should fail', function(done) {
    waitForDoesNotExist(done);
  });
});