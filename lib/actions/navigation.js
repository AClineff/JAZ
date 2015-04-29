var _ = require('underscore');
var Out = require('../output/output');

var navigation = {
    directions : {
        'n' : 'north',
        'north' : 'north',
        's' : 'south',
        'south' : 'south'
    },

    look : function(jaz){
        var io = jaz.io;
        var user = jaz.user;
        Out.sendMessageToUser([user.room.description, user.room.getExitsString()], user, io);
    },

    quicklook : function(jaz){
        var io = jaz.io;
        var user = jaz.user;
        Out.sendMessageToUser([user.room.shortDescription, user.room.getExitsString()], user, io);
    },

    navigateInDirection : function(dir, jaz){
        console.log('Tried to navigate! ', dir);
        var direction = this.directions[dir];
        var io = jaz.io;
        var world = jaz.world;
        var user = jaz.user;
        var currentroom = user.room;

        console.log(currentroom);

        if(!_.isUndefined(currentroom.exits[direction])){
            console.log('Room exists!');

            var newRoom = world.getRoom(currentroom.exits[direction]);
            var oldRoom = currentroom;

            newRoom.addUserToRoom(user);
            oldRoom.removeUserFromRoom(user);
            user.room = newRoom;

            Out.sendMessageToUser([user.room.description, user.room.getExitsString()], user, io);
        }
        else {
            console.log('Room doesn\'t exist!');
            io.to(user.socketId).emit('chat message', ['There is no exit in that direction!']);
        }

    }
};

module.exports = navigation;