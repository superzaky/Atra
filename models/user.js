var MongoDocument = require(process.env.root + '/lib/MongoDocument');
var validator = require('validator');
var sha1 = require('sha1');
var md5 = require('MD5');

var properties = {
    "email": String,
    "password": String,
    "first_name": String,
    "last_name": String,
    "image": String
}

var methods = {
    "getFullName": function () {
        return this.first_name + ' ' + this.last_name;
    },

    "setPassword": function (password) {
        this.password = sha1(password);
    },

    "hasValidEmail": function () {
        return validator.isEmail(this.email);
    },

    "setValues": function (values) {
        for (var key in values) {
            if (key === 'email') {
                this[key] = values[key].toLowerCase();
                this['image'] = 'https://www.gravatar.com/avatar/' + md5(this[key]) + '?d=identicon&s=512';
            } else if (key === 'password') {
                this.setPassword(values[key]);
            } else {
                this[key] = values[key];
            }
        }

        return this;
    }
}

var statics = {};

module.exports = MongoDocument('User', properties, methods, statics);
