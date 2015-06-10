var MongoDocument = require(process.env.root + '/lib/MongoDocument');
var validator = require('validator');
var fs = require('fs');

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
        var self = this;

        for (var key in values) {
            if (typeof values[key] === 'string' && values[key].trim() === '') continue;

            if (key === 'image') {
                
                var image = values[key];

                fs.readFile(image.path, function (err, data) {
                    self[key] = 'data:image/' + image.extension + ';base64,' + new Buffer(data).toString('base64');
                });
            } else {
                this[key] = values[key];
            }
        }

        return this;
    }
}

var statics = {};

module.exports = MongoDocument('Project', properties, methods, statics);
