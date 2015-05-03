$(document).ready(function ()
{
    $('#register-form').submit(function (e)
    {
        e.preventDefault();

        post(this)
        .done(function (data) {
            if (data) window.location = '/';
        })
        .always(function (response) {
            if (response.status.toString[0] != 2) notify(response.responseText, 'Warning');
        });
    });
});
