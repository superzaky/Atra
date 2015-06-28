$(window).load(function ()
{
    var $body = $('body');

    $(document).ajaxStart(function () {
        $body.addClass('loading');
    }).ajaxStop(function () {
        $body.removeClass('loading');
    });
});

function post(form, config)
{
    var options = {
        url: form.action,
        type: form.method,
        processData: true,
        cache: false
    };

    if (isset(config)) {
        $.each(config, function(key, value) {
            options[key] = value;
        });
    }

    if ($.inArray(form.method.toLowerCase(), ['get', 'delete']) === -1 && form.enctype == 'multipart/form-data') {
        options.data = new FormData(form);
    } else {
        options.data = $(form).serialize();
    }

    return $.ajax(options)
    .always(function (response) {
        if (isset(response) && isset(response.status) && response.status.toString[0] != 2) {
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
