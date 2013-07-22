"use strict";

var chai   = require('chai');
var expect = chai.expect;
var http   = require('http');


// Create an HTTP tunneling proxy
var proxy = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('okay');
});

before(function(done){
    proxy.listen(1337, '127.0.0.1', done);
});

describe('async tests', function () {
    it('first passes', function (done) {
        process.nextTick(function () {
            expect(true).to.equal(true);
            done();
        });
    });
    it('second fails', function (done) {
        process.nextTick(function () {
            expect(true).to.equal(false);
            done();
        });
    });
    it('third passes', function (done) {
        process.nextTick(function () {
            expect(true).to.equal(true);
            done();
        });
    });
});