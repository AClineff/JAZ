
module.exports = User;

var defaults = {
    name : 'Unknown',
    description : 'This user doesn\'t exist',
    room : null,
    socketId : null
}

function User(options){
    this.initialize(options);
}

User.prototype.initialize = function(options){
    this.name = options.name || defaults.name;
    this.description = options.description || defaults.description;
    this.room = options.room || defaults.room;
    this.socketId = options.socketId || defaults.socketId;
};

User.prototype.logon = function(){
    console.log("User ", this.name, " logged on at ", new Date().toDateString());
};

User.prototype.logoff = function(){
    console.log("User ", this.name, " logged off at ", new Date().toDateString());
};