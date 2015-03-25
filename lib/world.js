/**
 * Created by Allen on 3/25/2015.
 */


var world = {
    getRoom : function(id){
        var room = {};
        room.id = id;
        room.name = "A generic room.";
        room.description = "There is absolutely nothing remarkable about the room around you.";
        room.exits = ['north', 'west'];
        return room;
    }
};

module.exports = world;


