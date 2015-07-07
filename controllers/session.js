module.exports =
{
    "get": function (req, res, args) {
        if (typeof req.session.user === 'undefined' || req.session.user === null) {
            return res.status(404).send('Session not found');
        }

        res.json(req.session);
    }
}
