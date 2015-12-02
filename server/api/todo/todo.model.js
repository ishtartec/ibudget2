'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  title: String,
  done: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);
