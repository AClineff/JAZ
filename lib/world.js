var TestRooms = require('./test/testRooms');

var world = {
    rooms : {},
    initialize : function(options){
        this.rooms = TestRooms.getRooms();
    },

    getRoom : function(id){
        //var room = {};
        //room.id = id;
        //room.name = "A generic room.";
        //room.description = "There is absolutely nothing remarkable about the room around you.";
        //room.exits = ['north', 'west'];
        return this.rooms[id];
    }
};

module.exports = world;


