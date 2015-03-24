var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var i = 0;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', function(socket){
    var username = 'User' + i;
    i++;

    var user = {};
    user.name = username;


    io.emit('chat message', 'User ' + username + ' Connected!');

    socket.on('chat message', function(msg){
        io.emit('chat message', makeMessage(msg, user));
    });

    socket.on('disconnect', function(){
        io.emit('chat message', 'User ' + user.name + ' Disconnected!');
        i--;
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

var makeMessage = function(msg, user){
    if(msg.message.indexOf('/me') == 0){
        var newName = msg.message.slice(4);
        var oldName = user.name;
        user.name = newName;
        return 'User '+ oldName + ' is now known as ' + user.name;
    }

    return user.name + " : " + msg.message;
}