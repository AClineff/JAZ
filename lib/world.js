var TestRooms = require('./test/testRooms');

var world = {
    rooms : {},
    initialize : function(options){
        this.rooms = TestRooms.getRooms();
    },

    getRoom : function(id){
        return this.rooms[id];
    }
};

module.exports = world;


