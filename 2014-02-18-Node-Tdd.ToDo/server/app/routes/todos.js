/* jshint camelcase:false */

'use strict';

var mongodb = require('mongodb');
var Todo;

exports.create = function(req, res){
  init();

  var t1 = new Todo(req.body);
  t1.save(function(){
    res.send(t1);
  });
};

exports.index = function(req, res){
  init();

  Todo.findAll(function(todos){
    res.send({todos:todos});
  });
};

exports.show = function(req, res){
  init();

  var id = req.params.id;
  Todo.findById(id, function(foundTodo){
    res.send(foundTodo);
  });
};

exports.update = function(req, res){
  init();

  var id = new mongodb.ObjectID(req.params.id);
  var name = req.body.name;
  var dueDate = req.body.dueDate;
  var isComplete = req.body.isComplete;
  var tags = req.body.tags;
  var priority_id = req.body.priority_id;
  var t1 = new Todo({_id:id, name:name, dueDate:dueDate, isComplete:isComplete, tags:tags, priority_id:priority_id});
  t1.save(function(){
    res.send(t1);
  });
};

function init(){
  Todo = global.nss.Todo;
}
