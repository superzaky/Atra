$(document).on('change', '.btn-file :file', function() {
    var input = $(this);
    var numFiles = input.get(0).files ? input.get(0).files.length : 1;
    var label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

    input.trigger('fileselect', [numFiles, label]);
});

$(document).ready(function ()
{
    cropBoxData = null;
    canvasData = null;

    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        var input = $(this).parents('.input-group').find(':text');
        var log = numFiles > 1 ? numFiles + ' files selected' : label;

        if(input.length) {
            input.val(log);
        } else {
            if(log) alert(log);
        }
    });

    $('#upload-project-image').change(function(){
        var $image = $('#preview-project');
        $image.removeClass('hidden');

        $('#crop-btn').removeClass('hidden');

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
      var data = $image.cropper('getCropBoxData');
      if ((data.width > 1000 || data.height > 1000) || (data.width < 100 || data.height < 100)) {
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

    $('#add-project-modal').on('hidden.bs.modal', function () {
      var $image = $('#preview-project');
      $image.cropper('destroy');
    });

    $('#add-project-form').submit(function (e)
    {
        e.preventDefault();

        var $image = $('#preview-project');
        var data = $image.cropper('getCropBoxData');
        if ((data.width > 1000 || data.height > 1000) || (data.width < 100 || data.height < 100)) {
          return notify('Image must be smaller than 1000x1000 pixels and bigger than 100x100, please crop it', 'Warning');
        }

        var config = {
            processData: false,
            contentType: false
        }

        post(this, config)
        .done(function (data) {
            var project = 
            "<li id='project-" + data._id + "'>" + 
                "<h1><a href='projects/" + data._id + "'>" + data.name + "</a> <small><small>" +
                "[<a data-toggle='modal' href='#delete-project-modal' data-id='" + data._id + "'>Delete</a> | <a href='#'>Edit</a>]</small></small></h1>" +
                "<p>" + data.content + "</p>" +
                "<img class='img-responsive' src='" + data.image + "'>" +
            "</li>";

            $('#project-list').prepend(project);
            $('#add-project-modal').modal('hide');
            notify('Changes have been saved succesfully', 'Success');
            $('#save-btn').addClass('hidden');

        });

        $('#project-name').val('');
        $('#project-text').val('');
        $('#file-name').val('');
        $image.attr('src', '');
        $image.attr('alt', '');
        $('#save-btn').removeClass('hidden');
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
