module.exports =
{
    default: function (req, res, args) {
        res.render('admin/chat', { 'user' : req.session.user });
    }
}
