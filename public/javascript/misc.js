function post(form)
{
    return $.ajax({
        url: form.action,
        type: form.method,
        data: $(form).serialize()
    });
}

function notify(message)
{
    if ($('.single-notification').length) return;

    $notification = $(
        '<div class="alert single-notification">' +
        '<a href="#" class="close" data-dismiss="alert">&times;</a>' + 
        message + '</div>'
    );

    $('body').prepend($notification);

    setTimeout(function() {
        $notification.remove();
    }, 3000);
}
