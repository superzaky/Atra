var pkg = require(process.env.root + '/package.json');
var routes = require(process.env.root + '/config/routes');
var config = require(process.env.root + '/config/settings');

module.exports =
{
    default: function (req, res, args) {
        res.sendFile(process.env.root + config.public_folder + '/app/app.html');
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
        var apis = [];

        routes.forEach(function (api) {
            if (api.resource.indexOf('/api') !== -1) {
                apis.push({
                    resource: api.resource,
                    method: api.method.toUpperCase()
                });
            }
        });

        res.json(apis);
    }
}
