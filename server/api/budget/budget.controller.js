/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/budgets              ->  index
 * POST    /api/budgets              ->  create
 * GET     /api/budgets/:id          ->  show
 * PUT     /api/budgets/:id          ->  update
 * DELETE  /api/budgets/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Budget = require('./budget.model');
var Job = require('../job/job.model');

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function saveUpdates(updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.saveAsync()
            .spread(function (updated) {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.removeAsync()
                .then(function () {
                    res.status(204).end();
                });
        }
    };
}

// Gets a list of Budgets
exports.index = function (req, res) {
    Budget.findAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Gets a single Budget from the DB
exports.show = function (req, res) {
    Budget.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Creates a new Budget in the DB
exports.create = function (req, res) {
    Job.logger(Job.JOB_OK, 'Budget created', 'Customer: ' + req.body.customer, req.body.createdBy, new Date(), 'Created successfully', Job.INFO)
    Budget.createAsync(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
};

// Updates an existing Budget in the DB
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Job.logger(Job.JOB_OK, 'Budget updated', 'Customer: ' + req.body.customer, req.body.updatedBy, new Date(), 'Updated successfully', Job.INFO);
    Budget.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Deletes a Budget from the DB
exports.destroy = function (req, res) {
    Job.logger(Job.JOB_OK, 'Budget deleted', 'Customer: ' + res.customer, 'System', new Date(), 'Deleted successfully', Job.ALERT);
    Budget.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
};
