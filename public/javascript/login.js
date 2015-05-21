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
            $('#login-modal .modal-content').effect('shake');
        });
    });
});
