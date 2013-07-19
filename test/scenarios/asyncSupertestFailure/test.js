var request = require('supertest'),
    express = require('express'),
    chai = require('chai');

chai.should();

describe('test', function() {
  before(function(done) {
    var app = express();
    app.get('/', function(request, response) {
      response.send(200, 'Hello');
    });
    app.listen(3000, done);
  });

  it('should fail', function(done) {
    request('http://localhost:3000/')
    .get('/')
    .expect(200)
    .end(function(error, response){
      response.text.should.equal('Hello');
      response.shouldNotBeOk.should.be.ok();
      done();
    });
  });

  it('should pass', function(done) {
    request('http://localhost:3000/')
    .get('/')
    .expect(200)
    .end(function(error, response){
      response.text.should.equal('Hello');
      done();
    });
  });
});