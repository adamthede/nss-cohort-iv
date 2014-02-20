'use strict';

var mongodb = require('mongodb');
var Priority;

exports.index = function(req,res){
  init();

  Priority.findAll(function(priorities){
    res.send({priorities:priorities});
  });

};

exports.create = function(req, res){
  init();

  var p1 = new Priority(req.body);
  p1.save(function(){
    res.send(p1);
  });
};

exports.show = function(req, res){
  init();
  
  var id = req.params.id;
  Priority.findById(id, function(foundPriority){
    res.send(foundPriority);
  });
};

exports.destroy = function(req, res){
  init();

  var id = req.params.id;
  Priority.deleteById(id, function(count){
    res.send({id:id, count:count});
  });
};

exports.update = function(req, res){
  init();

  var id = mongodb.ObjectID(req.params.id);
  var name = req.body.name;
  var value = req.body.value;
  var p1 = new Priority({_id:id, name:name, value:value});
  p1.save(function(){
    res.send(p1);
  });
};

function init(){
  Priority = global.nss.Priority;
}
