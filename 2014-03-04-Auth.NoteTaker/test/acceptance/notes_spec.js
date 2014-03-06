/* jshint expr:true */

'use strict';

process.env.DBNAME = 'notes-app';
var app = require('../../app/app');
var request = require('supertest');
//var expect = require('chai').expect;
var User;
var Note;
var u1;
var n1;
var cookie;

describe('users', function(){

  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      Note = require('../../app/models/note');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      u1 = new User({email:'adam@adam.com', password:'1234'});
      u1.hashPassword(function(){
        u1.insert(function(){
          n1 = new Note({title:'My Note', body:'stuff', dateCreated:'2014-03-06', tags:'new, note, weather', userId:u1._id.toString()});
          n1.insert(function(){
            done();
          });
        });
      });
    });
  });

  describe('GET /notes', function(){
    it('should not display the notes page, user not logged', function(done){
      request(app)
      .get('/notes')
      .expect(302, done);
    });
  });

  describe('AUTHORIZED', function(){
    beforeEach(function(done){
      request(app)
      .post('/login')
      .field('email', 'adam@adam.com')
      .field('password', '1234')
      .end(function(err, res){
        cookie = res.headers['set-cookie'];
        done();
      });
    });

    describe('GET /notes', function(){
      it('logged so it should display the note page', function(done){
        request(app)
        .get('/notes')
        .set('cookie', cookie)
        .expect(200, done);
      });
    });

    describe('GET /notes/:id', function(){
      it('logged in user should be able to access a single note', function(done){
        var id = n1._id.toString();
        request(app)
        .get('/notes/' + id)
        .set('cookie', cookie)
        .expect(200, done);
      });
    });

    describe('GET /notes/new', function(){
      it('logged in user should be able to create a new note', function(done){
        request(app)
        .get('/notes/new')
        .set('cookie', cookie)
        .expect(200, done);
      });
    });

    describe('POST /notes', function(){
      it('logged in user should be able to save a new note in the db', function(done){
        request(app)
        .post('/notes')
        .set('cookie', cookie)
        .field('title', 'New Note')
        .field('body', 'I made an awesome new note')
        .field('dateCreated', '2014-03-05')
        .field('tags', 'new, homework, project')
        .field('userId', u1._id)
        .expect(302, done);
      });
    });

    describe('DEL /notes/:id', function(){
      it('should allow a logged in user to delete a note from the db', function(done){
        var id = n1._id.toString();
        request(app)
        .del('/notes/' + id)
        .set('cookie', cookie)
        .expect(302, done);
      });
    });
  });
});
