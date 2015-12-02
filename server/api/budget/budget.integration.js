'use strict';

var app = require('../..');
var request = require('supertest');

var newBudget;

describe('Budget API:', function() {

  describe('GET /api/budgets', function() {
    var budgets;

    beforeEach(function(done) {
      request(app)
        .get('/api/budgets')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          budgets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(budgets).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/budgets', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/budgets')
        .send({
          name: 'New Budget',
          info: 'This is the brand new budget!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newBudget = res.body;
          done();
        });
    });

    it('should respond with the newly created budget', function() {
      expect(newBudget.name).to.equal('New Budget');
      expect(newBudget.info).to.equal('This is the brand new budget!!!');
    });

  });

  describe('GET /api/budgets/:id', function() {
    var budget;

    beforeEach(function(done) {
      request(app)
        .get('/api/budgets/' + newBudget._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          budget = res.body;
          done();
        });
    });

    afterEach(function() {
      budget = {};
    });

    it('should respond with the requested budget', function() {
      expect(budget.name).to.equal('New Budget');
      expect(budget.info).to.equal('This is the brand new budget!!!');
    });

  });

  describe('PUT /api/budgets/:id', function() {
    var updatedBudget

    beforeEach(function(done) {
      request(app)
        .put('/api/budgets/' + newBudget._id)
        .send({
          name: 'Updated Budget',
          info: 'This is the updated budget!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBudget = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBudget = {};
    });

    it('should respond with the updated budget', function() {
      expect(updatedBudget.name).to.equal('Updated Budget');
      expect(updatedBudget.info).to.equal('This is the updated budget!!!');
    });

  });

  describe('DELETE /api/budgets/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/budgets/' + newBudget._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when budget does not exist', function(done) {
      request(app)
        .delete('/api/budgets/' + newBudget._id)
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
