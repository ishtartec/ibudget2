'use strict';

var app = require('../..');
var request = require('supertest');

var newTodo;

describe('Todo API:', function() {

  describe('GET /api/todos', function() {
    var todos;

    beforeEach(function(done) {
      request(app)
        .get('/api/todos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          todos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(todos).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/todos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/todos')
        .send({
          name: 'New Todo',
          info: 'This is the brand new todo!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newTodo = res.body;
          done();
        });
    });

    it('should respond with the newly created todo', function() {
      expect(newTodo.name).to.equal('New Todo');
      expect(newTodo.info).to.equal('This is the brand new todo!!!');
    });

  });

  describe('GET /api/todos/:id', function() {
    var todo;

    beforeEach(function(done) {
      request(app)
        .get('/api/todos/' + newTodo._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          todo = res.body;
          done();
        });
    });

    afterEach(function() {
      todo = {};
    });

    it('should respond with the requested todo', function() {
      expect(todo.name).to.equal('New Todo');
      expect(todo.info).to.equal('This is the brand new todo!!!');
    });

  });

  describe('PUT /api/todos/:id', function() {
    var updatedTodo

    beforeEach(function(done) {
      request(app)
        .put('/api/todos/' + newTodo._id)
        .send({
          name: 'Updated Todo',
          info: 'This is the updated todo!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTodo = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTodo = {};
    });

    it('should respond with the updated todo', function() {
      expect(updatedTodo.name).to.equal('Updated Todo');
      expect(updatedTodo.info).to.equal('This is the updated todo!!!');
    });

  });

  describe('DELETE /api/todos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/todos/' + newTodo._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when todo does not exist', function(done) {
      request(app)
        .delete('/api/todos/' + newTodo._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
