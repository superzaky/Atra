$(document).ready(function ()
{
    $('#settings-form').submit(function (e)
    {
        e.preventDefault();

        post(this)
        .done(function (data) {
            notify('Changes have been saved succesfully', 'Success');
        });
    });
});
