var mongoose = require('mongoose');

module.exports = function (name, properties, methods, statics) {
    var Schema = new mongoose.Schema(properties);

    // methods
    Schema.methods.setValues = function (values) {
        for (var key in values) {
            this[key] = values[key];
        }

        return this;
    }

    Schema.methods.hasProperties = function (properties) {
        for (var i in properties) {
            var key = properties[i];
            if(typeof this[properties[i]] === 'undefined' || this[key] === null) return false;
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
        this.find(filter, function (err, docs) {
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