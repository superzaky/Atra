var User = require(process.env.root + '/models/user');
var sha1 = require('sha1');

module.exports =
{
    authorize: function (req, res, args) {
        User.findOne({
            'username' : req.body.username,
            'password' : sha1(req.body.password)
        },
        function (err, doc) {
            if (!doc) return res.json({ 'error' : 'Invalid username or password' });

            delete doc.password;
            req.session.user = doc;
            res.json({ 'redirect' : '/' });
        });
    },
    unauthorize: function (req, res, args) {
        delete req.session.user;
        res.redirect('/');
    }
}
