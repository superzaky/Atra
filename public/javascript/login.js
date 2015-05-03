$(document).ready(function ()
{
    $('#signin-form').submit(function (e)
    {
        e.preventDefault();
        post(this)
        .done(function (data) {
            if (data.redirect) {
                window.location.href = data.redirect;
            }
        })
        .always(function (response) {
            if (response.status.toString[0] != 2) notify(response.responseText, 'Warning');
            $('#login-modal .modal-content').effect('shake');
        });
    });
});
