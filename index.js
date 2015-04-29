var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var world = require('./lib/world');
var Parser = require('./lib/parser/parser');
var Out = require('./lib/output/output');

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

// See Socket.IO API for more details.
// This is called when a new client initializes a connection with the server.
// All the methods dealing with THAT unique connection (socket) are initialized
// here as well.
io.on('connection', function (socket) {

    // Generate a unique user id
    var username = 'User' + i;
    i++;

    // Create a user object TODO Make one of these.
    var user = {};

    // Populate User fields TODO read from database
    user.name = username;
    user.socketId = socket.id;
    user.room = world.getRoom(1);

    // Add the user to the world. Plop!
    world.getRoom(1).addUserToRoom(user);


    Out.broadcastMessage(['User ' + user.name + ' Connected!'], io);
    Out.sendMessageToUser([user.room.description, user.room.getExitsString()], user, io);

    // When receiving socket.io 'chat message' from this user
    // Do whatever.
    socket.on('chat message', function (msg) {
        Parser.parseMessage(msg.message, {
            user : user,
            world : world,
            io : io
        });
    });

    socket.on('disconnect', function () {
        Out.broadcastMessage('User ' + user.name + ' Disconnected', io);
        i--;
    });

});

// Use port 3000 for http connection (including the socket.io...I think.)
http.listen(3000, function () {
    console.log('listening on *:3000');
});