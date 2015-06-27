var Project = require(process.env.root + '/models/project');

module.exports =
{
    // admin
    view_projects: function (req, res, args) {
        Project.fetchAll({}, function (err, docs) {
            res.render('projects', { 'user' : req.session.user, 'projects' : docs });
        });
    },

    view_project: function (req, res, args) {
        Project.fetch({
            "_id": req.params.id
        }, function (err, doc) {
            var project = doc;
            //http://themeandphoto.com/taplivedemos/2014/09/15/bootstrap-chat-example/index.html
            //geef hier aan dat je van /project url komt om later onderscheidt te maken van /chat url
            //console.log(project._id);
            res.render('project', { 'user' : req.session.user, 'project' : project });
        });
    },

    // api
    list: function (req, res, args) {
        var sanitize = ['_id', '__v'];
        var filter = req.query.filter;
        
        if (typeof filter != 'undefined' && filter != null) {
            sanitize = sanitize.concat(JSON.parse(filter));
        }

        Project.fetchAll({}, function (err, docs) {
            res.status(200).json(Project.sanitize(docs, sanitize));
        });
    },

    get: function (req, res, args) {
        Project.fetch({
            "_id": req.params.id
        }, function (err, doc) {
            var project = doc;
            if (typeof project === 'undefined' || project === null)  return res.status(404).send('Project not found');
            res.status(200).json(project.sanitize(['_id', '__v']));
        });
    },

    add: function (req, res, args) {
        if (typeof req.session.user === 'undefined' || req.session.user === null) {
            return res.status(401).send('Unauthorized');
        }
        
        var project = new Project();
        var required = ['name'];

        if (typeof req.body.base64 != 'undefined') {
            project.setValues({ "image": req.body.base64 });
        } else if (typeof req.files.image != 'undefined') {
            if (req.files.image['size'] > 2000000) return res.status(412).send('Your image file was larger than 2MB');
       		project.setValues({ "image": req.files.image });
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
