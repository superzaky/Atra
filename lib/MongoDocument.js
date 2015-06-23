var mongoose = require('mongoose');

module.exports = function (name, properties, methods, statics) {
    //properties.last_modified = new Date();

    var Schema = new mongoose.Schema(properties);

    // methods
    Schema.methods.setValues = function (values) {
        for (var key in values) {
            if (typeof values[key] === 'string' && values[key].trim() === '') continue;
            this[key] = values[key];
        }

        return this;
    }

    Schema.methods.hasProperties = function (properties) {
        for (var i in properties) {
            var key = properties[i];

            if(typeof this[properties[i]] === 'undefined' || this[key] === null || this[key].trim() == '') {
                return false;
            }
        }

        return true;
    }

    Schema.methods.sanitize = function (properties) {
        for (var i in properties) {
            var key = properties[i];
            this[key] = undefined;
        }

        return this;
    }

    // statics
    Schema.statics.fetchAll = function (filter, callback) {
        this.find(filter, null, {sort: {date: +1}} ,function (err, docs) {
            callback(err, docs);
        });
    }

    Schema.statics.fetch = function (filter, callback) {
        this.findOne(filter, function (err, doc) {
            callback(err, doc);
        });
    }

    Schema.statics.sanitize = function (docs, properties) {
        for (var key in docs) {
            docs[key].sanitize(properties);
        }

        return docs;
    }

    // override
    for (var key in methods) {
        Schema.methods[key] = methods[key];
    }

    for (var key in statics) {
        Schema.statics[key] = statics[key];
    }

    return mongoose.model(name, Schema);
}
