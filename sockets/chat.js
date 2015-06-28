module.exports = function (io, socket, clients)
{
    socket.on('client-message', function (data)
    {
        var user = socket.request.session.user;
        var uid = user.email;
        sendMessage(io, clients[uid], 'general', data.message);
    });
};

function sendMessage (io, client, room, message)
{
    if (client) io.to(room).emit('server-message', { 'user' : client.name, 'image' : client.image, 'message' : message });
}