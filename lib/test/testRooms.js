var BasicRoom = require('../../lib/rooms/basicRoom');
var _ = require('underscore');

var testRooms = {
    room1 : {
        id : 0,
        description : 'A plain, unassuming room.  Not that one would expect a room to assume anything, of course.',
        shortDescription : 'A plain, unassuming room.',
        exits : {
            north : 1
        }
    },
    room2 : {
        id : 1,
        description : 'A sunny room.  Where\'s the sun coming from?',
        shortDescription : 'A sunny room.',
        exits : {
            south : 0
        }
    },

    rooms : {},

    getRooms : function(){
        this.rooms[this.room1.id] = _.extend({}, BasicRoom, this.room1);
        this.rooms[this.room2.id] = _.extend({}, BasicRoom, this.room2);
        return this.rooms;
    }
};

module.exports = testRooms;