'use strict';

var Album = require('../models/album');

exports.index = function(req, res){
  Album.findAll(function(albums){
    res.render('home/index', {title: 'My Photo Albums', albums:albums});
  });
};

