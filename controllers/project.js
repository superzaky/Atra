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
       		project.setValues({ "image": req.files.image });
    	}

        //project.setValues(req.body);
        if (!project.setValues(req.body)) {
            return res.status(412).send('Your image file was larger than 1mb ');
        }

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
        var project = new Project();
        project.setValues(req.body);
        console.log(project._id);
        project.remove({ _id: project._id });
        
        
    },
}
