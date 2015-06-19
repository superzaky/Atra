var User = require(process.env.root + '/models/user');

module.exports =
{
    // admin
    settings: function (req, res, args) {
        res.render('admin/settings', { 'user' : req.session.user });
    },

    // api
    list: function (req, res, args) {
        User.fetchAll({}, function (err, docs) {
            res.status(200).json(User.sanitize(docs, ['_id', 'password', '__v']));
        });
    },

    add: function (req, res, args) {
        var user = new User();
        var required = ['email', 'password', 'first_name', 'last_name'];

        user.setValues(req.body);

        if (!user.hasProperties(required)) {
            return res.status(412).send('Users must have the following properties: ' + required.join(', '));
        }

        if (!user.hasValidEmail()) {
            return res.status(412).send(user.email + ' is not a valid email');
        }

        User.fetch({
            "email": user.email
        }, function (err, doc) {
            if (doc !== null) return res.status(412).send('User with email ' + user.email + ' already exists');
            user.save(function () {
                res.status(201).json(user.sanitize(['password', '__v']));
            });
        });
    },

    update: function (req, res, args) {
        if (typeof req.session.user === 'undefined' || req.session.user === null) {
            return res.status(401).send('Unauthorized');
        }

        User.fetch({
            "_id": req.params.id
        }, function (err, doc) {
            var user = doc;
            var required = ['email', 'password', 'first_name', 'last_name'];

            if (typeof user === 'undefined' || user === null)  return res.status(404).send('User not found');
            if (user.email !== req.session.user.email) return res.status(403).send('Not allowed to modify another user');

            delete req.body.email;
            delete req.body._id;
            delete req.body.__v;

            user.setValues(req.body);

            if (!user.hasProperties(required)) {
                return res.status(412).send('Users must have the following properties: ' + required.join(', '));
            }

            user.save(function () {
                user.sanitize(['password', '__v']);
                req.session.user = user;
                res.status(200).json(user);
            });
        });
    },

    get: function (req, res, args) {
        if (typeof req.session.user === 'undefined' || req.session.user === null) {
            return res.status(401).send('Unauthorized');
        }

        User.fetch({
            "_id": req.params.id
        }, function (err, doc) {
            var user = doc;

            if (typeof user === 'undefined' || user === null)  return res.status(404).send('User not found');
            if (user.email !== req.session.user.email) return res.status(403).send('Not allowed to fetch another user');

            res.status(200).json(user.sanitize(['password', '__v']));
        });
    }
}
