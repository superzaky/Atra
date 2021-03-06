var express = require('express');
var compression = require('compression');
var multer = require('multer');
var favicon = require('serve-favicon');
var session = require('express-session')
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('./config/settings');
var clients = [];


var sessionMiddleware = session({
    'secret' : 'ceH3MmAWTuRMp9xh4wGEzQtT',
    'resave' : false,
    'saveUninitialized' : true
});
app.use(compression());
app.use(multer({ dest: './uploads' }));
app.use(sessionMiddleware);
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({ 'extended' : true }));
app.use(express.static(__dirname + config.public_folder, { maxAge: 86400000 }));
app.use(favicon(__dirname + config.public_folder + '/assets/images/favicon.ico'));
process.env.root = __dirname;


for (var key in config) app.set(key, config[key]);


var routes = require('./config/routes');
routes.forEach(function(route) {
    var controller = require('./controllers/' + route.controller);
    router[route.method](route.resource, function(req, res)
    {
        controller[route.action](req, res, route.args);
    });
});
app.use(router);


io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});


io.on('connection', function (socket) {
    fs.readdir('./sockets', function(err, files) {
        files.forEach(function(file) {
            var s = require('./sockets/' + file)(io, socket, clients);
            if (typeof s != 'undefined' && typeof s.clients != 'undefined') clients = s.clients;
        });
    });
});


mongoose.connect(app.get('mongodb'));
server.listen(app.get('port'), function () {
    console.log('Server is listening at port ' + app.get('port'));
});
