'use strict';

var Note = require('../models/note');

exports.index = function(req, res){
  Note.findAllByUserId(req.session.userId, function(notes){
    res.render('notes/index', {title: 'Your Cool Notes', notes:notes});
  });
};

