$(document).on('click', '#signin-form-submit', function (e)
{
    e.preventDefault();
    login();
});

$(document).on('keypress', '#signin-form input', function (e)
{
    var code = e.keyCode || e.which;

    if(code == 13) {
        login();
    }
});

function login ()
{
    var values = $('#signin-form').serialize();

    $.ajax({
        'url' : '/login',
        'type' : 'POST',
        'data' : values
    })
    .done(function (data)
    {
        if (data.redirect) {
            window.location.href = data.redirect;
        } else {
            $('#login-modal .modal-content').effect('shake');
        }
    });
}
