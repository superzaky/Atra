var Project = require(process.env.root + '/models/project');

module.exports =
{
    default: function (req, res, args) {
        Project.fetchAll({}, function (err, docs) {
            res.render('projects', { 'user' : req.session.user, 'projects' : docs });
        });
    },

    // api
    list: function (req, res, args) {
        Project.fetchAll({}, function (err, docs) {
            res.status(200).json(Project.sanitize(docs, ['_id', '__v']));
        });
    },

    add: function (req, res, args) {
        // if (typeof req.session.user === 'undefined' || req.session.user === null) {
        //     return res.status(401).send('Unauthorized');
        // }

        var project = new Project();
        var required = ['name'];

        if (typeof req.files.image != 'undefined') {
            // plaats hier code om req.files.image grootte te checken
       		project.setValues({ "image": req.files.image });
    	}

        //project.setValues(req.body);
        if (!project.setValues(req.body)) {
            return res.status(412).send('Your image file was larger than 1mb ');
        }

        // je moet op een andere manier checken of die image groter is dan 1mb, niet met setvalues
        // je moet kijken in req.files.image, doe het dan ook in die 'if' op regel 27
        // return met een error als de image groter is dan 1mb

        /*if (!project.setValues(req.body)) {
            return res.status(412).send('Your image file was larger than 1mb ');
        }*/

        if (!project.hasProperties(required)) {
        	return res.status(412).send('Projects must have the following properties: ' + required.join(', '));
        }

        Project.fetch({
            "name": project.name
        }, function (err, doc) {
            if (doc !== null) return res.status(412).send('Project with name ' + project.name + ' already exists');
            project.save(function () {
                res.status(201).json(project.sanitize(['__v']));
            });
        });
    },

    delete: function (req, res, args) {
        Project.fetch({
            "_id": req.params.id
        }, function (err, doc) {
            var project = doc;
            if (project === null) return res.status(404).send('Project not found');
            project.remove();
            res.status(200).send('Project has been deleted');
        });
    }
}
