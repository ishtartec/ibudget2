'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var JobSchema = new Schema({
    status: Number,
    jobType: String,
    jobName: String,
    owner: String,
    logTime: Date,
    message: String,
    severity: Number
});

module.exports = mongoose.model('Job', JobSchema);
module.exports.JOB_OK = 11;
module.exports.JOB_ERROR = 12;
module.exports.EMERGENCY = 0;
module.exports.ALERT = 1;
module.exports.CRITICAL = 2;
module.exports.ERROR = 3;
module.exports.WARNING = 4;
module.exports.NOTICE = 5;
module.exports.INFO = 6;
module.exports.DEBUG = 7;

var logger = function logger(status, type, name, owner, time, message, severity) {
    var job = {
        status: status,
        jobType: type,
        jobName: name,
        owner: owner,
        logTime: time,
        message: message,
        severity: severity
    };
    module.exports.create(job, function (err, job) {
        if (err) {
            console.log('Error Cron 2: ' + err.message);
        }
    });
};

module.exports.logger = logger;
