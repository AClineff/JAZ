var BasicRoom = require('../../lib/rooms/basicRoom');
var _ = require('underscore');

var testRooms = {
    room1 : {
        id : 1,
        description : 'A plain, unassuming room.  Not that one would expect a room to assume anything, of course.',
        shortDescription : 'A plain, unassuming room.',
        exits : {
            north : 2
        }
    },
    room2 : {
        id : 2,
        description : 'A sunny room.  Where\'s the sun coming from?',
        shortDescription : 'A sunny room.',
        exits : {
            north : 3,
            south : 1
        }
    },

    room3 : {
        id : 3,
        description : 'A dark, musty room.  Deep shadows fill the corners and a pervasive, odd odor hangs in the air.',
        shortDescription : 'A dark, musty room.',
        exits : {
            south : 2
        }
    },

    rooms : {},

    getRooms : function(){
        this.addRoom(this.room1);
        this.addRoom(this.room2);
        this.addRoom(this.room3);

        return this.rooms;
    },

    addRoom : function(room){
        this.rooms[room.id] = _.extend({}, BasicRoom, room);
    }
};

module.exports = testRooms;