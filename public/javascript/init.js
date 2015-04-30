socket = io();

socket.on('redirect', function()
{
    window.location.href = '/';
});

socket.on('online', function (data)
{
    var $tbody = $('#table-currently-online tbody');
    var rows = '';

    for (var i = 0; i < data.users.length; i++) {
        rows += '<tr><td>' + data.users[i] + '</td></tr>';
    };

    $tbody.html('');
    $tbody.append(rows);

    if (data.users.length > 1 && !$.inArray($('#current-user').val(), data.users)) {
        $('#online-button').addClass('btn-info');
    }
});

$(document).on('click', '#online-button', function ()
{
    $('#online-button').removeClass('btn-info');
});
