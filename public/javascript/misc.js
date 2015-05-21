function post(form)
{
    return $.ajax({
        url: form.action,
        type: form.method,
        data: $(form).serialize()
    })
    .always(function (response) {
        if (typeof response.status !== 'undefined' && response.status.toString[0] != 2) {
            notify(response.responseText, 'Warning');
        }
    });
}

function notify(message, type)
{
    var color = type.toLowerCase() === 'success' ? 'success-color' : 'error-color';

    var $notification = $(
        '<div class="alert single-notification">' +
        '<a href="#" class="close" data-dismiss="alert">&times;</a>' + 
        '<span class="label ' + color + '">' + type + '</span> ' + message + '</div>'
    );

    $('body').append($notification.hide().fadeIn(500));

    setTimeout(function () {
        $notification.fadeOut(500, function () {
            $(this).remove();
        });
    }, 4000);
}
