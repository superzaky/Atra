$(document).on('change', '.btn-file :file', function() {
    var input = $(this);
    var numFiles = input.get(0).files ? input.get(0).files.length : 1;
    var label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

    input.trigger('fileselect', [numFiles, label]);
});

$(document).ready(function ()
{   
    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        var input = $(this).parents('.input-group').find(':text');
        var log = numFiles > 1 ? numFiles + ' files selected' : label;

        if(input.length) {
            input.val(log);
        } else {
            if(log) alert(log);
        }
    });

    $('#add-project-form').submit(function (e)
    {
        e.preventDefault();

        var config = {
            processData: false,
            contentType: false
        }

        post(this, config)
        .done(function (data) {
            var project = 
            "<li id='project-" + data._id + "'>" + 
                "<div class='text-right'>" +
                    "<a data-toggle='modal' href='#delete-project-modal' data-id='" + data._id + "'>Delete</a> |" +
                    "<a href='#'>Edit</a>" +
                "</div>" + 
                "<h1><a href='projects/" + data._id + "'>" + data.name + "</a></h1>" +
                "<p>" + data.content + "</p>" +
                "<img class='img-responsive' src='" + data.image + "'>" +
            "</li>";

            $('#project-list').append(project);
            $('#add-project-modal').modal('hide');
            notify('Changes have been saved succesfully', 'Success');
        });
    });

    $('#delete-project-modal').on('show.bs.modal', function(e) {
        var projectId = $(e.relatedTarget).data('id');
        var $form = $(e.currentTarget).find('#delete-project-form');
        $form.attr('action', '/api/projects/' + projectId);
        $form.attr('project', projectId);
    });

    $('#delete-project-form').submit(function (e)
    {
        e.preventDefault();

        var projectId = $(this).attr('project');
        var config = {
            type: 'delete'
        }

        post(this, config)
        .done(function (data) {
            $('#project-' + projectId).remove();
            $('#delete-project-modal').modal('hide');
            notify('Project has been successfully deleted', 'Success');
        });
    });
});
