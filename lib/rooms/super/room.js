var _ = require('underscore');

/**
 * @module room
 * @description Parent class for all room objects.
 * @type {{id: number, users: {}, mobs: {}, items: {}, exits: {}, description: string, shortDescription: string, addUserToRoom: Function, removeUserFromRoom: Function, isUserInRoom: Function, isMobInRoom: Function, isUIDinRoom: Function, getExitsString: Function}}
 */
var room = {
    // A unique ID that represents this room.
    id : 0,

    // A map of all player-controlled characters that are present in a room.
    // Uses the UID of the player to map to the user object
    users : {},

    // A map of all computer-controlled characters that are present in a room
    // Uses the UID of the mob to map to the mob object.
    mobs : {},

    // A map of all the items that are present in a room.
    // Uses the UID of the item to map to mob to the item object.
    items : {},

    // All the possible exits in the room.
    // Exit keys are the directions, and the value is the id of the room it connects to.
    // May potentially contain other identifiers, such as hidden or obstructed.
    exits : {},

    // A string representing the full description of the room.
    description : 'A very boring room.  Looking around, you see nothing interesting.  At all.',

    // A string highlighting the shorter, important parts of a room.
    shortDescription : 'A very boring room.',

    addUserToRoom : function(user){
        this.users[user.id] = user;
    },

    removeUserFromRoom : function(user){
        delete this.users[user.id];
    },

    // Returns true if the user's id is found in the room, false otherwise.
    isUserInRoom : function(id){
        return this.isUIDinRoom(id, this.users);
    },

    isMobInRoom : function(id){
        return this.isUIDinRoom(id, this.mobs);
    },

    isUIDinRoom : function(uid, map){
       return (map[uid] !== 'undefined');
    },

    getExitsString : function(){
        var s = '';
        var exits = [];

        for( var k in this.exits){
            if(this.exits.hasOwnProperty(k)) exits.push(k);
        }

        if(exits.length == 0) s = 'There are no discernible exits.';
        if(exits.length == 1) s = 'There is an exit <mark>' + exits[0] + '</mark>';
        if(exits.length > 1){
            s+= 'There are exits to the ' + '<mark>' + exits[0] + '</mark>';
            for(var i = 1; i < exits.length; i++){
                s += ', <mark>' + exits[i] + '</mark>';
            }
        }

        return s;
    }
};

module.exports = room;