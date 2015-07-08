var User = require(process.env.root + '/models/user');
var sha1 = require('sha1');

module.exports =
{
    "authorize": function (req, res, args) {
        User.fetch({
            'email' : req.body.email.toLowerCase(),
            'password' : sha1(req.body.password)
        },
        function (err, doc) {
            if (!doc) return res.status(400).send('Invalid email or password');
            req.session.user = doc.sanitize(['created', 'modified', 'password', '__v']);
            res.json({ 'redirect' : req.headers.referer, 'session' : req.sessionID, 'user' : req.session.user });
        });
    },

    "unauthorize": function (req, res, args) {
        delete req.session.user;
        res.redirect('/');
    },

    "register": function (req, res, args) {
        if (req.session.user) {
            res.redirect('/');
        } else {
            res.render('register', { 'user' : req.session.user });
        }
    }
}
