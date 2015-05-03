function post(form)
{
    return $.ajax({
        url: form.action,
        type: form.method,
        data: $(form).serialize()
    });
}

function notify(message, type)
{
    var $notification = $(
        '<div class="alert single-notification">' +
        '<a href="#" class="close" data-dismiss="alert">&times;</a>' + 
        '<span class="label error-color">' + type + '</span> ' + message + '</div>'
    );

    $('body').append($notification.hide().fadeIn(500));

    setTimeout(function () {
        $notification.fadeOut(500, function () {
            $(this).remove();
        });
    }, 4000);
}
