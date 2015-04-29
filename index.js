var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var world = require('./lib/world');

// UID counter for users TODO remove this shit.
var i = 0;

// When connecting to this endpoint, return the client-side index.html.
// This file should reference static files located in the public folder
// as indicated below.
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/index.html');
});

// Use the express static method to point to the 'public' folder
// as the location for static files.  Put all the client shit there.
app.use(express.static('public'));

// Bootstrap the world!
world.initialize();

console.log(world.getRoom(1));

// See Socket.IO API for more details.
// This is called when a new client initializes a connection with the server.
// All the methods dealing with THAT unique connection (socket) are initialized
// here as well.
io.on('connection', function (socket) {
    var username = 'User' + i;
    i++;

    var user = {};
    user.name = username;
    user.socketId = socket.id;
    user.room = world.getRoom(0);
    world.getRoom(0).addUserToRoom(user);

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

// Use port 3000 for http connection (including the socket.io...I think.)
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
        rs.push(room.description);

        //var s = "Exits are : ";
        //for(var i = 0; i < room.exits.length; i++){
        //    s += room.exits[i] + ', ';
        //}
        //rs.push(s);

        return rs;
    }

    if(msg.message.indexOf('n') > -1){
        if(user.room.exits['n'] !== 'undefined'){
            //There's an exit!
            var newRoom = world.getRoom(user.room.exits['north']);
            var oldRoom = user.room;

            newRoom.addUserToRoom(user);
            oldRoom.removeUserFromRoom(user);
            user.room = newRoom;
            return [user.room.description];
        }
    }

    return user.name + " : " + msg.message;
}