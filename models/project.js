var MongoDocument = require(process.env.root + '/lib/MongoDocument');
var validator = require('validator');


var properties = {
    "project_name": String,
    "project_content": String,
    "image": String
}

var methods = {
    "getProjectName": function () {
        return this.project_name + ' ' + this.project_name;
    }
}

var statics = {};

module.exports = MongoDocument('Project', properties, methods, statics);
