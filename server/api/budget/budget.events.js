/**
 * Budget model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Budget = require('./budget.model');
var BudgetEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BudgetEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Budget.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BudgetEvents.emit(event + ':' + doc._id, doc);
    BudgetEvents.emit(event, doc);
  }
}

module.exports = BudgetEvents;
