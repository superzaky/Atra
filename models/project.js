var MongoDocument = require(process.env.root + '/lib/MongoDocument');
var validator = require('validator');


var properties = {
    "name": String,
    "content": String,
    "image": String
}

var methods = {
    "getProjectName": function () {
        return this.project_name + ' ' + this.project_name;
    },

    "setValues": function (values) {
        for (var key in values) {
            if (typeof values[key] === 'string' && values[key].trim() === '') continue;

            if (key === 'image') {
                this[key] =  new Buffer(values[key]).toString('base64');
            } else {
                this[key] = values[key];
            }
        }

        return this;
    }
}

var statics = {};

module.exports = MongoDocument('Project', properties, methods, statics);
