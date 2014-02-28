/* jshint expr:true */

'use strict';

process.env.DBNAME = 'album-test';
var app = require('../../app/app');
var request = require('supertest');
//var expect = require('chai').expect;
//var rimraf = require('rimraf');
var fs = require('fs');
var exec = require('child_process').exec;
var Album;

describe('albums', function(){

  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      Album = require('../../app/models/album');
      done();
    });
  });

  beforeEach(function(done){
    //var imgdir = __dirname + '/../../app/static/img/';
    //rimraf.sync(imgdir);
    //fs.mkdirSync(imgdir);
    var testdir = __dirname + '/../../app/static/img/test*';
    var cmd = 'rm -rf ' + testdir;

    exec(cmd, function(){
      var origfile = __dirname + '/../fixtures/temp.jpg';
      var copyfile = __dirname + '/../fixtures/temp-copy.jpg';
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));
      global.nss.db.dropDatabase(function(err, result){
        done();
      });
    });
  });

  describe('GET /albums/new', function(){
    it('should return page for entering a new album', function(done){
      request(app)
      .get('/albums/new')
      .expect(200, done);
    });
  });

  describe('GET /albums/show', function(){
    it('should return the page for showing an album', function(done){
      request(app)
      .get('/albums/testIDtestIDtestIDtestID')
      .expect(200, done);
    });
  });

  describe('POST /albums', function(){
    it('should create a new album and redirect to the home page', function(done){
      var filename = __dirname + '/../fixtures/temp-copy.jpg';
      request(app)
      .post('/albums')
      .attach('cover', filename)
      .field('title', 'Test NSS Graduation')
      .field('taken', '2014-06-01')
      .expect(302, done);
    });
  });

  describe('POST /albums/id', function(){
    it('should add photos to an existing album', function(done){
      request(app)
      .post('/albums/testIDtestIDtestIDtestID')
      .expect(200, done);
    });
  });
});
