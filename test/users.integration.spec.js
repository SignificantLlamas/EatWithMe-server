/*eslint-disable */
var app = require('../server.js');
var expect = require('chai').expect;
var request = require('supertest');
var mongoose = require('mongoose');

var User = require('../models/users.model');

var clearDB = function (done) {
  mongoose.connection.collections['users'].remove(done);
};

describe('Users Integration Test', function () {
  beforeEach(function (done) {
    clearDB(function () {
      var users = [
        {
          username: 'test1',
          events: []
        },
        {
          username: 'test2',
          events: []
        },
        {
          username: 'test3',
          events: []
        }
      ];
      User.create(users, function () {
        done();
      });
    });
  });

  it('Signup creates a new user', function (done) {
    request(app)
    .post('/users')
    .send({
      username: 'test4'
    })
    .expect(201)
    .end(function (err) {
      if (err) {
        console.error(err);
        done(err);
      } else {
        User.findOne({ 'username': 'test4' })
        .exec(function (err, user) {
          expect(user.events).to.exist;
          done();
        });
      }
    });
  });

  it('Signs in an existing user', function (done) {
    request(app)
    .post('/users')
    .send({
      username: 'test3'
    })
    .expect(201)
    .end(function (err, response) {
      if (err) {
        console.error(err);
        done(err);
      } else {
        expect(response.body._id).to.be.a('string');
        done();
      }
    });
  });

  it('gets a user\'s info', function (done) {
    var testUserId;

    User.findOne({'username':'test1'})
    .then(function (user) {
      testUserId = user._id;

      request(app)
      .get('/users/'+testUserId)
      .expect(200)
      .end(function (err, response) {
        if(err){
          console.error(err);
          done(err);
        } else {
          expect(response.body.username).to.equal('test1');
          expect(response.body._id).to.equal(String(testUserId));
          done();
        }
      });
    });
  });
});
/*eslint-enable*/
