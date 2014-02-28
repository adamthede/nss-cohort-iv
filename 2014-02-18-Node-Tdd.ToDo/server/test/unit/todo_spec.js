/* jshint expr:true, camelcase:false */

'use strict';

var expect = require('chai').expect;
var Todo;
var Priority;
var priority_id;

describe('Todo', function(){

  before(function(done){
    var connect = require('../../app/lib/mongodb-connection-pool');
    connect('todo-test', function(){
      Todo = global.nss.Todo;
      Priority = global.nss.Priority;
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      var p1 = new Priority({name: 'High', value: '10'});
      var p2 = new Priority({name: 'Medium', value: '5'});
      var p3 = new Priority({name: 'Low', value: '1'});
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            Priority.findByName('Medium', function(foundPriority){
              priority_id = foundPriority._id;
              done();
            });
          });
        });
      });
    });
  });

  describe('new', function(){
    it('should create a new todo', function(){
      var t1 = new Todo({name:'Mow Lawn', dueDate:'02/14/2014', isComplete:false, tags:'home, garden', priority_id:priority_id});
      expect(t1).to.be.an.instanceof(Todo);
      expect(t1.name).to.equal('Mow Lawn');
      expect(t1.dueDate).to.be.an.instanceof(Date);
      expect(t1.tags).to.have.length(2);
      expect(t1.isComplete).to.be.false;
    });
  });

  describe('#save', function(){
    it('should save a todo in the database', function(done){
      var t1 = new Todo({name:'Mow Lawn', dueDate:'02/14/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      t1.save(function(err){
        expect(err).to.be.null;
        expect(t1).to.be.instanceof(Todo);
        expect(t1.name).to.equal('Mow Lawn');
        expect(t1).to.have.property('_id').and.be.ok;
        done();
      });
    });
  });

  describe('.findAll', function(){
    it('should return all to dos in the database', function(done){
      var t1 = new Todo({name:'Mow Lawn', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      var t2 = new Todo({name:'Pull Weeds', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      var t3 = new Todo({name:'Plant Flowers', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findAll(function(todos){
              expect(todos).to.have.length(3);
              done();
            });
          });
        });
      });
    });
  });

  describe('.queryData', function(){
    it('should return all to dos in the database via the filter query', function(done){
      var t1 = new Todo({name:'Mow Lawn', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      var t2 = new Todo({name:'Pull Weeds', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      var t3 = new Todo({name:'Plant Flowers', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      var t4 = new Todo({name:'Paint House', dueDate:'03/01/2014', isComplete:true, tags:['home'], priority_id:priority_id});
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            t4.save(function(){
              var queryObj = {tag:'home', limit:10, page:1, sort:'isComplete', order:-1};
              Todo.queryData(queryObj, function(todos){
                expect(todos).to.have.length(4);
                done();
              });
            });
          });
        });
      });
    });
  });


  describe('.findById', function(){
    it('should return a todo via a specific id', function(done){
      var t1 = new Todo({name:'Mow Lawn', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      var t2 = new Todo({name:'Pull Weeds', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      var t3 = new Todo({name:'Plant Flowers', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            var id = t1._id.toString();
            Todo.findById(id, function(foundTodo){
              expect(foundTodo._id.toString()).to.have.length(24);
              expect(foundTodo._id.toString()).to.equal(id);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findByComplete', function(){
    it('should return an array of todos with a specific complete boolean', function(done){
      var t1 = new Todo({name:'Mow Lawn', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      var t2 = new Todo({name:'Pull Weeds', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      var t3 = new Todo({name:'Plant Flowers', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            var complete = false;
            Todo.findByComplete(complete, function(foundTodos){
              expect(foundTodos).to.have.length(3);
              expect(foundTodos[0].isComplete).to.equal(false);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findByPriority', function(){
    it('should return an array of todos with a specific priority', function(done){
      var t1 = new Todo({name:'Mow Lawn', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      var t2 = new Todo({name:'Pull Weeds', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      var t3 = new Todo({name:'Plant Flowers', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findByPriority(priority_id, function(foundTodos){
              expect(foundTodos).to.have.length(3);
              expect(foundTodos[0].priority_id).to.deep.equal(priority_id);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findByTag', function(){
    it('should return an array of todos with a specific tag', function(done){
      var t1 = new Todo({name:'Mow Lawn', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      var t2 = new Todo({name:'Pull Weeds', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      var t3 = new Todo({name:'Plant Flowers', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findByTag('home', function(foundTodos){
              expect(foundTodos).to.have.length(3);
              expect(foundTodos[0].name).to.equal('Mow Lawn');
              done();
            });
          });
        });
      });
    });
  });

  describe('.deleteById', function(){
    it('should delete a todo from the database', function(done){
      var t1 = new Todo({name:'Mow Lawn', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      var t2 = new Todo({name:'Pull Weeds', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      var t3 = new Todo({name:'Plant Flowers', dueDate:'02/28/2014', isComplete:false, tags:['home', 'garden'], priority_id:priority_id});
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            var id = t1._id.toString();
            Todo.deleteById(id, function(count){
              Todo.findById(id, function(foundPriority){
                expect(count).to.equal(1);
                expect(foundPriority).to.be.null;
                done();
              });
            });
          });
        });
      });
    });
  });

});
