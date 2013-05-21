/*global leak:true*/

describe('test', function() {
  it('should leak', function() {
    leak = 'this is a leak';
  });
});
