'use strict';

var Dog = require('../lib/dog');
var Cat = require('../lib/cat');

exports.create = function(req, res){
  var animal;

  if(req.query.type === 'Dog'){
    animal = new Dog(req.query.name, req.query.gender, req.query.age);
  }
  else{
    animal = new Cat(req.query.name, req.query.gender, req.query.age);
  }

  res.jsonp({animal: animal});
};
