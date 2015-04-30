$(document).on('keypress', '#chatbox', function (e)
{
    var code = e.keyCode || e.which;

    if(code == 13) {
        $chatbox = $('#chatbox input');
        var message = $chatbox.val();
        if (message.trim('') == '') return;
        socket.emit('client-message', { 'message' : message });
        $chatbox.val('');
    }
});

socket.on('server-message', function (data)
{
    var $message = $("<li class='message'></li>");
    $message.text(data.message);
    $message.prepend("<strong class='label label-default'>" + data.user + "</strong> ");
    $('#chatlog').append($message);
    $('#chatlog').scrollTop($('#chatlog')[0].scrollHeight);
});

socket.on('connected', function (data)
{
    $('#chatlog').append("<li class='message'><i>" + data.client +  " connected</i></li>");
});

socket.on('disconnected', function (data)
{
    $('#chatlog').append("<li class='message'><i>" + data.client + " disconnected</i></li>");
});
