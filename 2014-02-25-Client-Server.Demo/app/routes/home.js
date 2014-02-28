'use strict';

var _ = require('lodash');

exports.index = function(req, res){
  res.render('home/index', {title: 'Express Template'});
};

exports.calc = function(req, res){
  res.render('home/calc', {title: 'Calculator'});
};

exports.add = function(req, res){
  var x = req.query.x * 1;
  var y = req.query.y * 1;
  var sum = x + y;
  res.send({sum:sum});
};

exports.product = function(req, res){
  var x = req.query.x;
  var array = x.split(',').map(function(num){return num.trim();});
  var product = 1;
  _.forEach(array, function(num){
    product = product * num;
    return product;
  });
  res.send({product:product});
};
