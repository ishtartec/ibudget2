/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/todos              ->  index
 * POST    /api/todos              ->  create
 * GET     /api/todos/:id          ->  show
 * PUT     /api/todos/:id          ->  update
 * DELETE  /api/todos/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Todo = require('./todo.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Todos
exports.index = function(req, res) {
  Todo.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Todo from the DB
exports.show = function(req, res) {
  Todo.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Todo in the DB
exports.create = function(req, res) {
  Todo.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Todo in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Todo.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Todo from the DB
exports.destroy = function(req, res) {
  Todo.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
