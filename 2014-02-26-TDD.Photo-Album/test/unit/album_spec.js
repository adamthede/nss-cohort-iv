/* jshint expr:true */
'use strict';

process.env.DBNAME = 'album-test';
var expect = require('chai').expect;
var fs = require('fs');
var exec = require('child_process').exec;
//var rimraf = require('rimraf');
//var path = require('path');
var Album;

describe('Album', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Album = require('../../app/models/album');
      done();
    });
  });

  beforeEach(function(done){
    //var imgdir = __dirname + '/../../app/static/img/test';
    //rimraf.sync(imgdir);
    //fs.mkdirSync(imgdir);
    var testdir = __dirname + '/../../app/static/img/test*';
    var cmd = 'rm -rf ' + testdir;

    exec(cmd, function(){
      var origfile = __dirname + '/../fixtures/temp.jpg';
      var copyfile = __dirname + '/../fixtures/temp-copy.jpg';
      var copyfile2 = __dirname + '/../fixtures/temp-copy2.jpg';
      var copyfile3 = __dirname + '/../fixtures/temp-copy3.jpg';
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile2));
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile3));
      global.nss.db.dropDatabase(function(err, result){
        done();
      });
    });
  });

  describe('new', function(){
    it('should create a new album object', function(){
      var albumObj = {};
      albumObj.title = 'Test NSS Graduation';
      albumObj.taken = '2014-06-01';
      var a1 = new Album(albumObj);
      expect(a1).to.be.instanceof(Album);
      expect(a1.title).to.equal('Test NSS Graduation');
      expect(a1.taken).to.be.instanceof(Date);
      expect(a1.photos.length).to.equal(0);
    });
  });

  describe('#addCover', function(){
    it('should add a cover image to the album', function(){
      var albumObj = {};
      albumObj.title = 'Test NSS Graduation';
      albumObj.taken = '2014-06-01';
      var a1 = new Album(albumObj);
      var oldname = __dirname + '/../fixtures/temp-copy.jpg';
      a1.addCover(oldname);
      expect(a1.cover).to.equal('/img/testnssgraduation/cover.jpg');
      //__dirname + '/../../app/static/img/nssgraduation/cover.jpg'

    });
  });

  describe('#addPhoto', function(){
    it('should add a photo to the album', function(done){
      var albumObj = {};
      albumObj.title = 'Test NSS Graduation';
      albumObj.taken = '2014-06-01';
      var a1 = new Album(albumObj);
      var oldname = __dirname + '/../fixtures/temp-copy.jpg';
      a1.addCover(oldname);
      var oldname2 = __dirname + '/../fixtures/temp-copy2.jpg';
      a1.addPhoto(oldname2, 'temp-copy2.jpg',  function(err, record){
        expect(a1.photos[0]).to.equal('/img/testnssgraduation/temp-copy2.jpg');
        done();
      });
    });
  });

  describe('#update', function(){
    it('should update the album in the database', function(done){
      var albumObj = {};
      albumObj.title = 'Test NSS Graduation';
      albumObj.taken = '2014-06-01';
      var a1 = new Album(albumObj);
      var oldname = __dirname + '/../fixtures/temp-copy.jpg';
      a1.addCover(oldname);
      a1.insert(function(){
        a1.taken = '2012-05-10';
        a1.title = 'New Title';
        a1.update(function(err, count){
          expect(count).to.equal(1);
          done();
        });
      });
    });
  });

  describe('#insert', function(){
    it('should insert a new album into the database', function(done){
      var albumObj = {};
      albumObj.title = 'Test NSS Graduation';
      albumObj.taken = '2014-06-01';
      var a1 = new Album(albumObj);
      var oldname = __dirname + '/../fixtures/temp-copy.jpg';
      a1.addCover(oldname);
      a1.insert(function(err, savedAlbum){
        savedAlbum = savedAlbum[0];
        expect(savedAlbum._id.toString()).to.have.length(24);
        expect(savedAlbum.cover).to.be.ok;
        expect(savedAlbum.title).to.equal('Test NSS Graduation');
        done();
      });
    });
  });

  describe('.findAll', function(){
    it('should find all albums in the database', function(done){
      var a1 = new Album({title:'Test NSS Graduation', taken:'2014-06-01'});
      a1.addCover(__dirname + '/../fixtures/temp-copy.jpg');
      var a2 = new Album({title:'Test Christmas Vacation', taken:'2013-12-24'});
      a2.addCover(__dirname + '/../fixtures/temp-copy2.jpg');
      var a3 = new Album({title:'Test Summer Vacation', taken:'2013-06-15'});
      a3.addCover(__dirname + '/../fixtures/temp-copy3.jpg');
      a1.insert(function(){
        a2.insert(function(){
          a3.insert(function(){
            Album.findAll(function(albums){
              expect(albums).to.have.length(3);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findById', function(){
    it('should find album via id', function(done){
      var a1 = new Album({title:'Test NSS Graduation', taken:'2014-06-01'});
      a1.addCover(__dirname + '/../fixtures/temp-copy.jpg');
      var a2 = new Album({title:'Test Christmas Vacation', taken:'2013-12-24'});
      a2.addCover(__dirname + '/../fixtures/temp-copy2.jpg');
      var a3 = new Album({title:'Test Summer Vacation', taken:'2013-06-15'});
      a3.addCover(__dirname + '/../fixtures/temp-copy3.jpg');
      a1.insert(function(){
        a2.insert(function(){
          a3.insert(function(){
            var idToTest = a1._id;
            Album.findById(idToTest, function(foundAlbum){
              expect(foundAlbum._id.toString()).to.deep.equal(idToTest.toString());
              done();
            });
          });
        });
      });
    });
  });
});
