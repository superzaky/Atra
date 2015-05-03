socket = io();

socket.on('redirect', function()
{
    window.location.href = '/';
});

socket.on('online', function (data)
{
    var $tbody = $('#table-currently-online tbody');
    var rows = '';

    for (var i = 0; i < data.length; i++) {
        rows += '<tr><td><strong>' + data[i].name + '</strong>' + ' <small>(' + data[i].email + ')</small></td></tr>';
    }

    $tbody.html('');
    $tbody.append(rows);
});
