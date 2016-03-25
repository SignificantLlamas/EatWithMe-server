/*eslint-disable */
var app = require('../server.js');
var expect = require('chai').expect;
var request = require('supertest')(app);
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
          fbId: '1',
          fullName: 'test1 test1',
          firstName: 'test1',
          events: []
        },
        {
          fbId: '2',
          fullName: 'test2 test2',
          firstName: 'test2',
          events: []
        },
        {
          fbId: '3',
          fullName: 'test3 test3',
          firstName: 'test4',
          events: []
        }
      ];
      User.create(users, function () {
        done();
      });
    });
  });

  it('Signup creates a new user', function (done) {
    request
    .post('/users')
    .send({
      fbId: '4',
      fullName: 'test4 test4',
      firstName: 'test4'
    })
    .expect(201)
    .end(function (err) {
      if (err) {
        console.error(err);
        done(err);
      } else {
        User.findOne({ 'firstName': 'test4' })
        .exec(function (err, user) {
          expect(user.events).to.exist;
          done();
        });
      }
    });
  });

  it('Signs in an existing user', function (done) {
    request
    .post('/users')
    .send({
      fbId: '3',
      fullName: 'test3 test3',
      firstName: 'test3'
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

    User.findOne({'firstName':'test1'})
    .then(function (user) {
      testUserId = user._id;

      request
      .get('/users/'+testUserId)
      .expect(200)
      .end(function (err, response) {
        if(err){
          console.error(err);
          done(err);
        } else {
          expect(response.body.firstName).to.equal('test1');
          expect(response.body._id).to.equal(String(testUserId));
          done();
        }
      });
    });
  });

  it('returns 400 given a fake userId', function (done) {
    request
    .get('/users/56f211328a7c00b09f2986aa')
    .expect(400)
    .end(function (err, response) {
      if(err){
        console.error(err);
        done(err);
      } else {
        expect(response.status).to.equal(400);
        done();
      }
    });
  });
});
/*eslint-enable*/
