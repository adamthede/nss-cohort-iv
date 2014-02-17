'use strict';

var Movie = require('../models/movie');
var mongodb = require('mongodb');
//var assert = require('assert');

exports.create = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');
  var movie = new Movie(req.body);

  movies.insert(movie, function(err, records){
    res.send(records[0]);
  });
};

exports.index = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');
  movies.find().toArray(function(err, movies){
    res.send({movies: movies});
  });
};

exports.remove = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');
  var id = new mongodb.ObjectID(req.params.id);
  movies.remove({_id: id}, function(err, numberOfRemovedDocs){
    console.log(numberOfRemovedDocs);
    //var trigger = assert(1, numberOfRemovedDocs);
    res.send({_id: id});
  });
};

exports.record = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');
  var id = new mongodb.ObjectID(req.params.id);
  movies.find({_id:id}).toArray(function(err, movie){
    res.send({movie: movie});
  });
};

exports.update = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');
  var movie = new Movie(req.body);
  var id = new mongodb.ObjectID(req.params.id);
  movies.update({_id:id}, movie, function(err, count){
    console.log(count);
    res.send({id: id, movie: movie});
  });
};
