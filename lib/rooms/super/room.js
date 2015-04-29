var _ = require('underscore');

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
    }
};

module.exports = room;