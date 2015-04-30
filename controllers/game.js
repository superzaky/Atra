module.exports =
{
    default: function (req, res, args) {
        res.render('admin/game', { 'user' : req.session.user });
    }
}
