/* jshint expr:true, camelcase:false */

'use strict';

process.env.DBNAME = 'todo-test';
var app = require('../../app/app');
var request = require('supertest');
var expect = require('chai').expect;
var Todo;
var Priority;
var priority_id;
var todo_id;

describe('todos', function(){

  before(function(done){
    var connect = require('../../app/lib/mongodb-connection-pool');
    connect('todo-test', function(){
      Todo = global.nss.Todo;
      Priority = global.nss.Priority;
      done();
    });
  });

  beforeEach(function(done){
    var p1 = new Priority({name:'High', value:'10'});
    var p2 = new Priority({name:'Medium', value:'5'});
    var p3 = new Priority({name:'Low', value:'1'});
    var t1 = new Todo({name:'Mow Lawn', dueDate:'02/28/2014', isComplete:false, tags:'home, garden', priority_id:priority_id});
    var t2 = new Todo({name:'Pull Weeds', dueDate:'02/28/2014', isComplete:false, tags:'home, garden', priority_id:priority_id});
    var t3 = new Todo({name:'Plant Garden', dueDate:'02/28/2014', isComplete:false, tags:'home, garden', priority_id:priority_id});
    p1.save(function(){
      p2.save(function(){
        p3.save(function(){
          priority_id = p1.priority_id;
          t1.save(function(){
            t2.save(function(){
              t3.save(function(){
                todo_id = t1._id;
                done();
              });
            });
          });
        });
      });
    });
  });

  afterEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('GET /todos', function(){
    it('should return all todos in the database', function(done){
      request(app)
      .get('/todos')
      .end(function(err, res){
        expect(res.body.todos).to.have.length(3);
        expect(res.body.todos[0].name).to.be.ok;
        expect(res.body.todos[0].isComplete).to.be.false;
        expect(res.body.todos[0]._id).to.have.length(24);
        done();
      });
    });
  });

  describe('GET /todos?query', function(){
    it('should return all todos in the database that meet the query restrictions', function(done){
      request(app)
      .get('/todos?tag=home')
      .end(function(err, res){
        expect(res.body.todos).to.have.length(3);
        expect(res.body.todos[0].name).to.be.ok;
        expect(res.body.todos[0].isComplete).to.be.false;
        expect(res.body.todos[0]._id).to.have.length(24);
        done();
      });
    });
  });

  describe('POST /todos', function(){
    it('should post a new todo to the database', function(done){
      request(app)
      .post('/todos')
      .send({name:'Plant Garden', dueDate:'02/28/2014', isComplete:false, tags:'home, garden', priority_id:priority_id})
      .end(function(err, res){
        expect(res.body.name).to.equal('Plant Garden');
        expect(res.body).to.have.property('_id');
        expect(res.body.isComplete).to.be.false;
        expect(res.body.tags).to.be.instanceof(Array);
        done();
      });
    });
  });

  describe('GET /todos/:id', function(){
    it('should show a single todo from the database', function(done){
      var id = todo_id.toString();
      request(app)
      .get('/todos/'+id)
      .end(function(err, res){
        expect(res.body._id).to.equal(id);
        expect(res.body.name).to.be.ok;
        expect(res.body.tags).to.be.instanceof(Array);
        done();
      });
    });
  });

  describe('PUT /todos/:id', function(){
    it('should update a given todo in the database', function(done){
      var id = todo_id.toString();
      Todo.findById(id, function(foundTodo){
        foundTodo.name = 'Build Fence';
        foundTodo.tags = 'Home Improvement, Work';
        foundTodo.save(function(){
          request(app)
          .put('/todos/' + id)
          .send(foundTodo)
          .end(function(err, res){
            expect(res.body.name).to.equal('Build Fence');
            expect(res.body.tags).to.be.instanceof(Array);
            expect(res.body._id).to.equal(id);
            done();
          });
        });
      });
    });
  });

  describe('DELETE /todos/:id', function(){
    it('should delete a given todo in the database', function(done){
      var id = todo_id.toString();
      request(app)
      .del('/todos/' + id)
      .end(function(err, res){
        expect(res.body.count).to.equal(1);
        expect(res.body.id).to.equal(id);
        done();
      });
    });
  });

});
