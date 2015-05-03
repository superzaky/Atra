var url = require('url');

module.exports = function (io, socket, clients)
{
    var user = socket.request.session.user;
    var pathname = url.parse(socket.handshake.headers.referer).pathname;

    if (!user) {
        if (pathname.indexOf('/admin') != -1) socket.emit('redirect');
        return socket;
    }

    var uid = user.email;
    socket.uid = uid;
    socket.name = user.first_name + ' ' + user.last_name;
    joinRoom(socket, 'general');
    clients[uid] = socket;

    socket.on('disconnect', function ()
    {
        if (clients[uid] && clients[uid].name) clients[uid].broadcast.to('general').emit('disconnected', { 'client' : clients[uid].name });
        delete clients[uid];
    });

    var online = [];
    for (var key in clients) {
        online.push({ "email" : key, "name" : clients[key].name });
    }

    io.sockets.in('general').emit('online', online);
    socket.clients = clients;
    return socket;
};

function joinRoom (client, room)
{
    client.join(room);
    client.broadcast.to(room).emit('connected', { 'client' : client.name });
}
