// TODO: use angular-socket instead
socket = io();

(function () {
    socket.on('redirect', function()
    {
        window.location.href = '/';
    });
    
    socket.on('online', function (data)
    {
        var $tbody = $('#table-currently-online tbody');
        var rows = '';
    
        for (var i = 0; i < data.length; i++) {
            rows += '<tr><td class="col-xs-1"><img src="' + data[i].image + '" width="40" height="40"></td>' + 
            '<td class="col-xs-11"><strong>' + data[i].name + '</strong>' + ' <small>(' + data[i].email + ')</small></td></tr>';
        }
    
        $tbody.html('');
        $tbody.append(rows);
    });
    
    socket.on('env', function (env) {
        if (env !== 'production') {
            $('body').append('<script type="text/javascript" src="//localhost:35729/livereload.js"></script>');
        }
    });
})();
