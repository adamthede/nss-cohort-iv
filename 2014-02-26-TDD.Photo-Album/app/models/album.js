'use strict';

module.exports = Album;
var albums = global.nss.db.collection('albums');
var Mongo = require('mongodb');
var fs = require('fs');
var path = require('path');

function Album(album){
  this._id = album._id ? Mongo.ObjectID(album._id.toString()) : null;
  this.title = album.title;
  this.taken = new Date(album.taken);
  this.photos = album.photos ? album.photos : [];
  this.cover = album.cover ? album.cover : '';
}

Album.prototype.addCover = function(oldpath){
  var dirname = this.title.replace(/\s/g, '').toLowerCase();
  var abspath = __dirname + '/../static';
  var relpath = '/img/' + dirname;
  fs.mkdirSync(abspath + relpath);

  var extension = path.extname(oldpath);
  relpath += '/cover' + extension;
  fs.renameSync(oldpath, abspath + relpath);

  this.cover = relpath;
};

Album.prototype.addPhoto = function(oldpath, oldname, fn){
  var dirname = this.title.replace(/\s/g, '').toLowerCase();
  var abspath = __dirname + '/../static';
  var relpath = '/img/' + dirname;

  relpath += '/' + oldname;
  fs.renameSync(oldpath, abspath + relpath);
  this.photos.push(relpath);
  this.update(fn);
};

Album.prototype.update = function(fn){
  albums.update({_id:this._id}, this, function(err, count){
    fn(err, count);
  });
};

Album.prototype.insert = function(fn){
  albums.insert(this, function(err, record){
    fn(err, record);
  });
};

Album.findAll = function(fn){
  albums.find().toArray(function(err, albums){
    fn(albums);
  });
};

Album.findById = function(id, fn){
  var _id = new Mongo.ObjectID(id.toString());
  albums.findOne({_id:_id}, function(err, record){
    fn(new Album(record));
  });
};

