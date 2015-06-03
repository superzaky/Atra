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

    $('#project-form').submit(function (e)
    {
        e.preventDefault();
        post(this, false, false)
        .done(function (data) {
            notify('Changes have been saved succesfully', 'Success');
        });
    });
});
