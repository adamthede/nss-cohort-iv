'use strict';

var _ = require('lodash');

exports.product = function(req, res){
  var numbers = req.query.numbers.split(', ');
  var prod = _.reduce(numbers, function(accumulator, e){
    return accumulator*e;
  }, 1);
  res.jsonp({product: prod});
};

exports.namecalc = function(req, res){
  var names = req.query.names.split(', ');
  var odds = _.filter(names, function(e){
    return e.length % 2 !== 0;
  });
  var sumOdds = _.reduce(odds, function(accumulator, e){
    return accumulator + e.length;
  }, 0);
  var response;
  if(sumOdds % 2 === 0){
    response = Math.pow(sumOdds, 3);
  }
  else if(sumOdds % 2 !== 0){
    response = Math.pow(sumOdds, 2);
  }
  res.jsonp({namecalc: response});
};
