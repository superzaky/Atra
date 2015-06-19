var pkg = require(process.env.root + '/package.json');
var routes = require(process.env.root + '/config/routes');

module.exports =
{
    default: function (req, res, args) {
        res.render('index', { 'user' : req.session.user });
    },
    info: function (req, res, args) {
        res.json({
            'name' : pkg.name,
            'version' : pkg.version,
            'description' : pkg.description,
            'env' : process.env.NODE_ENV
        });
    },
    api: function (req, res, args) {
        routes.forEach(function (api) {
            delete api.controller;
            api.method = api.method.toUpperCase();
            if (api.resource.indexOf('api') === -1) routes.splice(api, 1);
        });

        res.json(routes);
    }
}
