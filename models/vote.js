var MongoDocument = require(process.env.root + '/lib/MongoDocument');
var fs = require('fs');

var properties = {
    "user_id": String,
    "project_id": String
};

var methods = {

    "setValues": function (values) {
        for (var key in values) {
            if (typeof values[key] === 'string' && values[key].trim() === '') continue;

            this[key] = values[key];
        }

        return this;
    }
}

var statics = {};

module.exports = MongoDocument('Vote', properties, methods, statics);
