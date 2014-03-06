'use strict';

var Note = require('../models/note');

exports.index = function(req, res){
  Note.findAllByUserId(req.session.userId, function(notes){
    res.render('notes/index', {title: 'Your Cool Notes', notes:notes});
  });
};

exports.show = function(req, res){
  var id = req.params.id;
  Note.findById(id, function(foundNote){
    res.render('notes/show', {note:foundNote});
  });
};

exports.new = function(req, res){
  res.render('notes/new', {title: 'Create a New Note'});
};

exports.create = function(req, res){
  req.body.userId = req.session.userId;
  var newNote = new Note(req.body);
  newNote.insert(function(){
    res.redirect('notes/index');
  });
};

exports.delete = function(req, res){
  var id = req.params.id;
  Note.deleteById(id, function(){
    res.redirect('notes/index');
  });
};
