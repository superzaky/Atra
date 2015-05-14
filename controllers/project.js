module.exports =
{
    default: function (req, res, args) {
<<<<<<< HEAD
       res.render('projects');
       //res.redirect('/projects');
      // res.location('/projects');
=======
        res.render('projects', { 'user' : req.session.user });
>>>>>>> 16eb3424b7d1eecb25ddde9a4f4b3ec0b21cdb1d
    }
}
