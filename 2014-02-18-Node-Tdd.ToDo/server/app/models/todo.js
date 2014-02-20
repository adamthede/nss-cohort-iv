/* jshint camelcase:false */

'use strict';

module.exports = Todo;
var todos = global.nss.db.collection('todos');
var mongodb = require('mongodb');

function Todo(todo){
  this._id = todo._id;
  this.name = todo.name || '';
  this.dueDate = new Date(todo.dueDate);
  this.isComplete = todo.isComplete || false;
  if(todo.tags instanceof Array){
    this.tags = todo.tags;
  }
  else if(todo.tags){
    this.tags = todo.tags.split(', ');
  }
  else{
    this.tags = [];
  }
  this.priority_id = todo.priority_id;
}

Todo.prototype.save = function(fn){
  todos.save(this, function(err, record){
    fn(err);
  });
};

Todo.findAll = function(fn){
  todos.find().toArray(function(err, todos){
    fn(todos);
  });
};

Todo.findById = function(id, fn){
  var _id = new mongodb.ObjectID(id);
  todos.findOne({_id:_id}, function(err, record){
    fn(record ? new Todo(record) : null);
  });
};

Todo.findByComplete = function(complete, fn){
  todos.find({isComplete:complete}).toArray(function(err, todos){
    fn(todos);
  });
};

Todo.findByPriority = function(id, fn){
  todos.find({priority_id:id}).toArray(function(err, todos){
    fn(todos);
  });
};

Todo.findByTag = function(tag, fn){
  todos.find({tags: { $in: [tag]}}).toArray(function(err, todos){
    fn(todos);
  });
};

Todo.deleteById = function(id, fn){
  var _id = mongodb.ObjectID(id);
  todos.remove({_id:_id}, function(err, count){
    fn(count);
  });
};
