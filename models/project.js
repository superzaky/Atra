var MongoDocument = require(process.env.root + '/lib/MongoDocument');
var fs = require('fs');

var properties = {
    "name": String,
    "content": String,
    "image": String
};

var methods = {
    "setImage" : function (image) {
        var self = this;

        if (typeof image === 'string') {
            this.image = image;
            return this;
        }

        fs.readFile(image.path, function (err, data) {
            self.image = 'data:image/' + image.extension + ';base64,' + new Buffer(data).toString('base64');
            fs.unlink(image.path);
        });

        return this;
    },

    "setValues": function (values) {
        for (var key in values) {
            if (typeof values[key] === 'string' && values[key].trim() === '') continue;

            this[key] = values[key];
        }

        return this;
    }
}

var statics = {};

module.exports = MongoDocument('Project', properties, methods, statics);
