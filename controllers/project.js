var Project = require(process.env.root + '/models/project');

module.exports =
{
    default: function (req, res, args) {
       res.render('projects');
    }

    add: function (req, res, args) {
        var project = new Project();
        var required = ['project_name'];

        project.setValues(req.body);

        if (!project.hasProperties(required)) {
            return res.status(412).send('A project must have a name ' + required.join(', '));
        }


        Project.fetch({
            "project_name": project.project_name
        }, function (err, doc) {
            if (doc !== null) return res.status(412).send('Project with name ' + project.project_name + ' already exists');
            project.save(function () {
                //res.status(201).json(project.sanitize(['password', '__v']));
            });
        });
    }
}
