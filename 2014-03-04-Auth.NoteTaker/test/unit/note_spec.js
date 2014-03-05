/* jshint expr:true */

'use strict';

process.env.DBNAME = 'notes-app';
var expect = require('chai').expect;
var Mongo = require('mongodb');
var User;
var Note;
var sue;

describe('Note', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Note = require('../../app/models/note');
      User = require('../../app/models/user');
      done();
    });
  });
  
  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      sue = new User({email:'sue@aol.com', password:'1234'});
      sue.hashPassword(function(){
        sue.insert(function(){
          done();
        });
      });
    });
  });

  describe('new', function(){
    it('should create a new Note object', function(){
      var n1 = new Note({title:'My Note', body:'stuff', dateCreated:'2014-03-06', tags:'new, note, weather', userId:sue._id.toString()});
      expect(n1).to.be.instanceof(Note);
      expect(n1.title).to.equal('My Note');
      expect(n1.dateCreated).to.be.instanceof(Date);
      expect(n1.tags).to.be.instanceof(Array);
      expect(n1.body).to.equal('stuff');
      expect(n1.tags).to.have.length(3);
      expect(n1.userId).to.be.instanceof(Mongo.ObjectID);
    });
    
    it('should create a new Note object', function(){
      var n1 = new Note({title:'My Note', body:'stuff', tags:'', dateCreated:'', userId:sue._id.toString()});
      expect(n1.tags).to.have.length(0);
      expect(n1.dateCreated.toDateString()).to.equal(new Date().toDateString());
    });
  });

  describe('#insert', function(){
    it('should save a new Note object', function(done){
      var n1 = new Note({title:'My Note', body:'stuff', dateCreated:'2014-03-06', tags:'new, note, weather', userId:sue._id.toString()});
      n1.insert(function(err){
        expect(n1._id.toString()).to.have.length(24);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a specific note via id', function(done){
      var n1 = new Note({title:'My Note', body:'stuff', dateCreated:'2014-03-06', tags:'house, work, garden', userId:sue._id.toString()});
      var n2 = new Note({title:'Fryman Notes', body:'Robert wrote some stuff', dateCreated:'', tags:'spotify, github', userId:sue._id.toString()});
      n1.insert(function(){
        n2.insert(function(){
          var id = n1._id.toString();
          Note.findById(id, function(note){
            expect(note._id.toString()).to.equal(id);
            expect(note.title).to.equal('My Note');
            done();
          });
        });
      });
    });
  });

  describe('.findAllByUserId', function(){
    it('should find a specific note via id', function(done){
      var n1 = new Note({title:'My Note', body:'stuff', dateCreated:'2014-03-06', tags:'house, work, garden', userId:sue._id.toString()});
      var n2 = new Note({title:'Fryman Notes', body:'Robert wrote some stuff', dateCreated:'', tags:'spotify, github', userId:sue._id.toString()});
      var n3 = new Note({title:'Fryman Notes', body:'Robert wrote some stuff', dateCreated:'', tags:'spotify, github'});
      n1.insert(function(){
        n2.insert(function(){
          n3.insert(function(){
            var id = sue._id.toString();
            Note.findAllByUserId(id, function(notes){
              expect(notes).to.have.length(2);
              done();
            });
          });
        });
      });
    });
  });

  describe('#update', function(){
    it('should allow a user to update a note in the db', function(done){
      var n1 = new Note({title:'My Note', body:'stuff', dateCreated:'2014-03-06', tags:'house, work, garden', userId:sue._id.toString()});
      var n2 = new Note({title:'Fryman Notes', body:'Robert wrote some stuff', dateCreated:'', tags:'spotify, github', userId:sue._id.toString()});
      n1.insert(function(){
        n2.insert(function(){
          n1.title = 'Adam Note';
          n1.body = 'I wrote a lot of stuff';
          n1.update(function(count){
            expect(count).to.equal(1);
            expect(n1.title).to.equal('Adam Note');
            expect(n1.body).to.equal('I wrote a lot of stuff');
            done();
          });
        });
      });
    });
  });

  describe('#delete', function(){
    it('should delete a user in out db', function(done){
      var n1 = new Note({title:'My Note', body:'stuff', dateCreated:'2014-03-06', tags:'house, work, garden', userId:sue._id.toString()});
      var n2 = new Note({title:'Fryman Notes', body:'Robert wrote some stuff', dateCreated:'', tags:'spotify, github', userId:sue._id.toString()});
      n1.insert(function(){
        n2.insert(function(){
          n1.delete(function(count){
            expect(count).to.equal(1);
            var id = sue._id.toString();
            Note.findAllByUserId(id, function(notes){
              expect(notes).to.have.length(1);
              done();
            });
          });
        });
      });
    });
  });

});
