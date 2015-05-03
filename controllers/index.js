var project = require(process.env.root + '/package.json');

module.exports =
{
    default: function (req, res, args) {
        app.render('index', { 'user' : req.session.user });
    },
    info: function (req, res, args) {
        res.json({
            'name' : project.name,
            'version' : project.version,
            'description' : project.description,
            'env' : process.env.NODE_ENV
        });
    }
}
