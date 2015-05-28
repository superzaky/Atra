var Project = require(process.env.root + '/models/project');
var fs = require('fs');
module.exports =
{
    default: function (req, res, args) {
       res.render('projects');
    },

    // api
    list: function (req, res, args) {
        Project.fetchAll({}, function (err, docs) {
            res.status(200).json(Project.sanitize(docs, ['_id', '__v']));
        });
    },

    add: function (req, res, args) {
    	if (req.get('content-type').indexOf('multipart/form-data') === false) {
    		return res.status(406).send('Unacceptable MIME type');
    	}
        
        var project = new Project();
        var required = ['name'];

        if (typeof req.files.image != 'undefined') {
	        fs.readFile(req.files.image.path, function (err, data) {
       			project.setValues({ "image": data });
	        });
    	}

        project.setValues(req.body);

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
    }
}
