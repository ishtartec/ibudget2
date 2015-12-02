'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var BudgetSchema = new Schema({
    name: String,
    customer: String,
    instructorFee: Number,
    instructorHours: Number,
    instructorTotal: Number,
    vendorFee: Number,
    vendorCount: Number,
    vendorTotal: Number,
    manualsFee: Number,
    manualsCount: Number,
    manualsTotal: Number,
    expensesFee: Number,
    expensesCount: Number,
    expensesTotal: Number,
    travelCost: Number,
    travelCount: Number,
    travelTotal: Number,
    pueCost: Number,
    pueCount: Number,
    pueTotal: Number,
    otherCost: Number,
    otherCount: Number,
    otherTotal: Number,
    date: Date,
    comments: String,
    ic: Number,
    dc: Number,
    bi: Number,
    total: Number,
    createdBy: String,
    createdAt: Date,
    updatedBy: String,
    approved: Boolean,
    accepted: Boolean,
    approvedBy: String
});

module.exports = mongoose.model('Budget', BudgetSchema);
