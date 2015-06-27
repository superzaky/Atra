var MongoDocument = require(process.env.root + '/lib/MongoDocument');
var validator = require('validator');
var mongoose = require('mongoose');
var moment = require('moment-timezone');
var fs = require('fs');

// var properties = {
//     "name": String,
//     "content": String,
//     "image": String,
//     "created" : {[
//        {date: type: Date, default: Date.now},
//        {user: type: String, default: 'john'}
//     ]}
// };

var properties = {
    "name": String,
    "content": String,
    "image": String,
    "created": {
        type: Object,
        default: {
            date: { type: Date, default: Date.now },
            user: { type: String, default: 'john' }
        }
    }
};

var methods = {
    "getProjectName": function () {
        return this.project_name + ' ' + this.project_name;
    },

    "setValues": function (values) {
        var self = this;
       // process.env.TZ = 'Europe/Amsterdam'
       // self.date = new Date();
        //self.date = (new time.Date()).setTimezone('Europe/Amsterdam');
        // var n =  self.date.getTimezoneOffset();
        // console.log(n);

        // var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        // console.log(tzoffset+'\n');
        // console.log(Date.now()+'\n');
        // var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
        // console.log(localISOTime);

        // self.date = localISOTime;

       // var now=moment().tz('Europe/Amsterdam').format();
        //var now=moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss+01:00');
       // self.date=now.toISOString();
        //var now=moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss+01:00');
        //self['date']=now;

        for (var key in values) {
            if (typeof values[key] === 'string' && values[key].trim() === '') continue;

            if (key === 'image' && typeof values[key] !== 'string') {
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
