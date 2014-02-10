'use strict';

exports.index = function(req, res){
  res.jsonp({ok:true});
};

exports.name = function(req, res){
  res.jsonp({name: 'my name is node'});
};

exports.favcolor = function(req, res){
  res.jsonp({favcolor: 'olive green'});
};

exports.sum = function(req, res){
  var total = parseFloat(req.params.a) + parseFloat(req.params.b);
  res.jsonp({sum: total});
};

exports.candrink = function(req, res){
  var response;
  var name = req.params.name;
  var age = req.params.age;

  if(age <= 17){
    response = 'No.';
  }
  else if(age >= 18 && age <= 20){
    response = 'Maybe.';
  }
  else if(age >= 21){
    response = 'Yes.';
  }
  response = 'Can ' + name + ' drink? ' + response;
  res.jsonp({answercandrink: response});
};
