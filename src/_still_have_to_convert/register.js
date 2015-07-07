$(document).ready(function ()
{
    $('#register-form').submit(function (e)
    {
        e.preventDefault();

        post(this)
        .done(function (data) {
            notify('Successfully registered! You will be redirected to the homepage shortly...', 'Success');

            setTimeout(function () {
                window.location = '/';
            }, 4000);
        });
    });
});
