var User = require(process.env.root + '/models/user');

module.exports =
{
    list: function (req, res, args) {
        var users = User.fetchAll({}, function (err, docs) {
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
    }
}
