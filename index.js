var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var world = require('./lib/world');

var i = 0;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/index.html');
});

app.use(express.static('public'));

io.on('connection', function (socket) {
    var username = 'User' + i;
    i++;

    var user = {};
    user.name = username;
    user.socketId = socket.id;
    user.room = world.getRoom('room0');

    io.emit('chat message', 'User ' + username + ' Connected!');

    socket.on('chat message', function (msg) {
      //  io.emit('chat message', msg.message );
        io.to(user.socketId).emit('chat message', makeMessage(msg, user));
    });

    socket.on('disconnect', function () {
        io.emit('chat message', 'User ' + user.name + ' Disconnected!');
        i--;
    });

});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

var makeMessage = function (msg, user) {
    // User changing username
    if (msg.message.indexOf('/me') == 0) {
        var newName = msg.message.slice(4);
        var oldName = user.name;
        user.name = newName;
        return 'User ' + oldName + ' is now known as ' + user.name;
    }

    // User looking!
    if(msg.message.indexOf('look') > -1){
        var room = user.room;
        var rs = [];
        rs.push(room.name);
        rs.push(room.description);

        var s = "Exits are : ";
        for(var i = 0; i < room.exits.length; i++){
            s += room.exits[i] + ', ';
        }
        rs.push(s);

        return rs;
    }

    return user.name + " : " + msg.message;
}