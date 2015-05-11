module.exports =
{
    default: function (req, res, args) {
        res.render('admin/projects', { 'user' : req.session.user });
    }
}
