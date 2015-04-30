var User = require(process.env.root + '/models/user');

module.exports =
{
    list: function (req, res, args) {
        User.find({}, function (err, docs) {
            for (var i = 0; i < docs.length; i++) {
                docs[i]['password'] = null;
            }
            res.json(docs);
        });
    },
    add: function (req, res, args) {
        var user = new User();
        user.setValues(req.body);

        if (!user.isValid()) return res.status(412).send('User given is invalid');

        user.setPassword(req.body.password);

        user.save();
        res.status(201).json(user);
    }
}
