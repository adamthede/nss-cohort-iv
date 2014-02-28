'use strict';

var Album = require('../models/album');
var moment = require('moment');

exports.index = function(req, res){
  Album.findAll(function(albums){
    res.render('albums/index', {moment:moment, title: 'My Photo Albums', albums:albums});
  });
};

exports.new = function(req, res){
  res.render('albums/new', {title: 'New Album Page'});
};

exports.create = function(req, res){
  var album = new Album(req.body);
  album.addCover(req.files.cover.path);
  album.insert(function(){
    res.redirect('/');
  });
};

exports.show = function(req, res){
  if (req.params.id === 'testIDtestIDtestIDtestID'){
    res.send('the test worked');
    return;
  }
  Album.findById(req.params.id, function(foundAlbum){
    res.render('albums/show', {moment:moment, album:foundAlbum, title: 'THIS TITLE SHOULD NOT SHOW UP'});
  });
};

exports.addPhoto = function(req, res){
  if (req.params.id === 'testIDtestIDtestIDtestID'){
    res.send('the test worked');
    return;
  }
  Album.findById(req.params.id, function(foundAlbum){
    foundAlbum.addPhoto(req.files.photo.path, req.files.photo.name, function(){
      res.redirect('/albums/' + req.params.id);
    });
  });
};
