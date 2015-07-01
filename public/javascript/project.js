// uploading
$(document).on('change', '.btn-file :file', function() {
    var input = $(this);
    var numFiles = input.get(0).files ? input.get(0).files.length : 1;
    var label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

    input.trigger('fileselect', [numFiles, label]);
});

// on page ready
$(document).ready(function ()
{
    var cropData = null;

    // frontend helpers
    $('#upload-project-image').change(function () {
        var $image = $('#preview-project');
        $image.removeClass('hidden');

        $('#crop-btn').removeClass('hidden');
        $('#save-btn').addClass('hidden');

        previewImage(this, $image, function ($element)
        {
          $element.cropper({
            aspectRatio: NaN,
            autoCropArea: 0.90,
            strict: false,
            guides: true,
            highlight: false,
            dragCrop: false,
            cropBoxMovable: false,
            cropBoxResizable: false
          });
        });
    });

    $('#crop-btn').on('click', function () {
      var $image = $('#preview-project');
      cropData = $image.cropper('getData');

      if ((cropData.width > 1000 || cropData.height > 1000) || (cropData.width < 100 || cropData.height < 100)) {
        return notify('Image must be smaller than 1000x1000 pixels and bigger than 100x100, please crop it', 'Warning');
      }

      var canvas = $image.cropper('getCroppedCanvas');
      var src = canvas.toDataURL();
      $image.cropper('destroy');
      $image.attr('src', src);
      $('#image-base64').val(src);
      $('#crop-btn').addClass('hidden');
      $('#save-btn').removeClass('hidden');
    });

    // add project
    $('#add-project-modal').on('hidden.bs.modal', function () {
      $('#preview-project').cropper('destroy');
    });

    $('#add-project-form').submit(function (e)
    {
        e.preventDefault();

        if (cropData && ((cropData.width > 1000 || cropData.height > 1000) || (cropData.width < 100 || cropData.height < 100))) {
          return notify('Image must be smaller than 1000x1000 pixels and bigger than 100x100, please crop it', 'Warning');
        }

        var config = {
            processData: false,
            contentType: false
        }

        post(this, config)
        .done(function (data) {
            var $project =
            "<li id='project-" + data._id + "'>" +
                "<h1><a class='project-name' href='projects/" + data._id + "'>" + data.name + "</a> <small><small>" +
                "[<a data-toggle='modal' href='#delete-project-modal' data-id='" + data._id + "'>Delete</a> | <a data-toggle='modal' href='#edit-project-modal' data-id='" + data._id + "'>Edit</a>]</small></small></h1>" +
                "<p class='project-content' data-content='" + data.content + "'>" + data.content + "</p>" +
                "<img class='img-responsive' src='" + data.image + "'>" +
                "<p class='text-muted'>Created by <code>" + data.created.user.first_name + ' ' + data.created.user.last_name + "</code> at <code>" + (new Date(data.created.date)).toUTCString() + "</code></p>" +
                "<p class='text-muted'>Last modified by <code>" + data.modified.user.first_name + ' ' + data.modified.user.last_name + "</code> at <code>" + (new Date(data.modified.date)).toUTCString() + "</code></p>" +
            "</li>";

            $('#project-list').prepend($project);
            $('#add-project-modal').modal('hide');

            notify('Changes have been saved succesfully', 'Success');
        });

        $('#project-name').val('');
        $('#project-text').val('');
        $('#file-name').val('');
        $('#preview-project').attr({'src': '', alt: ''});
        $('#save-btn').removeClass('hidden');
    });


    // delete project
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

    // edit project
    $('#edit-project-modal').on('show.bs.modal', function(e) {
        var projectId = $(e.relatedTarget).data('id');

        var $form = $(e.currentTarget).find('#edit-project-form');
        $form.attr('action', '/api/projects/' + projectId);
        $form.attr('project', projectId);

        var $project = $('#project-' + projectId);
        $form.find('#project-name').val($project.find('.project-name').text());
        $form.find('#project-content').val($project.find('.project-content').data('content'));
    });


    $('#edit-project-form').submit(function (e)
    {
        e.preventDefault();

        var projectId = $(this).attr('project');
        var config = {
            processData: false,
            contentType: false
        }

        post(this, config)
        .done(function (data) {
            var $project =
            "<h1><a class='project-name' href='projects/" + data._id + "'>" + data.name + "</a> <small><small>" +
            "[<a data-toggle='modal' href='#delete-project-modal' data-id='" + data._id + "'>Delete</a> | <a data-toggle='modal' href='#edit-project-modal' data-id='" + data._id + "'>Edit</a>]</small></small></h1>" +
            "<p class='project-content' data-content='" + data.content + "'>" + data.content + "</p>" +
            "<img class='img-responsive' src='" + data.image + "'>" +
            "<p class='text-muted'>Created by <code>" + data.created.user.first_name + ' ' + data.created.user.last_name + "</code> at <code>" + (new Date(data.created.date)).toUTCString() + "</code></p>" +
            "<p class='text-muted'>Last modified by <code>" + data.modified.user.first_name + ' ' + data.modified.user.last_name + "</code> at <code>" + (new Date(data.modified.date)).toUTCString() + "</code></p>";

            $('#project-' + projectId).html($project);

            $('#edit-project-modal').modal('hide');
            notify('Project has been successfully modified', 'Success');
        });
    });

});

// functions
function previewImage(input, $element, callback) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $element.attr('src', e.target.result);
            if (isset(callback)) callback($element);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$(document).on('keypress', '#chatbox', function (e)
{
    var code = e.keyCode || e.which;

    if(code == 13) {
        $chatbox = $('#chatbox input');
        var message = $chatbox.val();     
        if (message.trim('') == '') return;
        socket.emit('client-message', { 'message' : message });
        $chatbox.val('');
    }
});

// sockets
socket.on('server-message', function (data)
{
    var url = window.location.pathname.split('/'); 

        var $message = $(
        "<li class='message media'>" +
            "<div class='media-body'>" +
                "<div class='media'>" +
                    "<a class='pull-left' href='#'>" +
                        "<img class='media-object img-circle' src='#'>" +
                    "</a>" +
                "</div>" +
            "</div>" +
        "</li>"
        );
    
    var dateObj = new Date();
    var year = dateObj.getUTCFullYear();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var hour = dateObj.getUTCHours();
    var minute = dateObj.getUTCMinutes();
    var second = dateObj.getUTCSeconds();
   
    newdate = year + "-" + month + "-" + day+"T"+hour+":"+minute+":"+second+"+01:00";

    $message.html(data.message);
   

    if (url[1] == 'projects') {
     $message.append("");
     $message.append("<br><small class='text-muted'>" + data.user +" | "+newdate+ "</small>");
    }else{
     $message.prepend("<strong class='label label-default'>" + data.user + "</strong> ");
    } 

    $('#chatlog').append($message);
    $('#chatlog').scrollTop($('#chatlog')[0].scrollHeight);
});
