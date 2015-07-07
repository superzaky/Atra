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
    var url = window.location.pathname.split('/'); 

    if (url[1] == 'projects') {
        var $message = $(
        "<li class='message media'>" +
            "<div class='media-body'>" +
                "<div class='media'>" +
                    "<a class='pull-left' href='#'>" +
                        "<img class='media-object img-circle' src='#'>" +
                    "</a>" +
                "</div>" +
            "</div>" +
        "</li>"
        );
    }else{
     var $message = $("<li class='message'></li>"); 
    }
    var dateObj = new Date();
    var year = dateObj.getUTCFullYear();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var hour = dateObj.getUTCHours();
    var minute = dateObj.getUTCMinutes();
    var second = dateObj.getUTCSeconds();
   
    newdate = year + "-" + month + "-" + day+"T"+hour+":"+minute+":"+second+"+01:00";

    $message.html(data.message);
   

    if (url[1] == 'projects') {
     $message.append("");
     $message.append("<br><small class='text-muted'>" + data.user +" | "+newdate+ "</small>");
    }else{
     $message.prepend("<strong class='label label-default'>" + data.user + "</strong> ");
    } 

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
