var mongoose = require('mongoose');
var sha1 = require('sha1');

var properties = {
    'first_name' : String,
    'last_name' : String,
    'birth_date' : String,
    'username' : String,
    'password' : String
}

var Schema = new mongoose.Schema(properties)

Schema.methods.getFullName = function () {
    return this.first_name + this.last_name;
}

Schema.methods.setPassword = function (password) {
    this.password = sha1(password);
}

Schema.methods.isValid = function () {
    for (var key in properties) {
        if(typeof this[key] === 'undefined' || this[key] === null) return false;
    }

    return true;
}

Schema.methods.setValues = function (values) {
    for (var key in values) {
        this[key] = values[key];
    }
}

module.exports = mongoose.model('User', Schema);
