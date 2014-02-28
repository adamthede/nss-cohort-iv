/* jshint camelcase:false */

'use strict';

module.exports = Todo;
var todos = global.nss.db.collection('todos');
var mongodb = require('mongodb');

function Todo(todo){
  this._id = todo._id ? mongodb.ObjectID(todo._id) : null;
  this.name = todo.name;
  this.dueDate = todo.dueDate ? new Date(todo.dueDate) : null;
  this.isComplete = !!todo.isComplete;
  this.tags = todo.tags || '';
  this.tags = this.tags.split(',').map(function(tag){return tag.trim();});
  this.tags = _.compact(this.tags);
  this.priority_id = todo.priority_id ? mongodb.ObjectID(todo.priority_id) : null;
}

Todo.prototype.save = function(fn){
  if(this.priority_id && this.name && this.dueDate){
    todos.save(this, function(err, record){
      fn(err);
    });
  }
  else{
    fn(new Error('Failed Validation'));
  }
};

Todo.findAll = function(fn){
  todos.find().toArray(function(err, todos){
    fn(todos);
  });
};

Todo.queryData = function(queryObj, fn){
  var query = {};
  var limit = queryObj.limit || 4;
  var skip = queryObj.page ? (queryObj.page - 1) * limit : 0;
  var sort = [];

  if(queryObj.filterName === 'priority_id'){
    queryObj.filterValue = mongodb.ObjectID(queryObj.filterValue);
  }

  query[queryObj.filterName] = queryObj.filterValue;

  if(queryObj.sort){
    var order = queryObj.order ? queryObj.order * 1 : 1;
    sort.push([queryObj.sort, order]);
  }

  todos.find(query).sort(sort).skip(skip).limit(limit).toArray(function(err, todos){
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

Todo.findByIdAndToggleIsComplete = function(id, fn){
  var _id = mongodb.ObjectID(id);

  todos.findOne({_id:_id}, function(err, todo){
    todo.isComplete = !todo.isComplete;

    todos.save(todo, function(err){
      fn(todo);
    });
  });
};
