//
//module.exports = Output;
//
//function Output(io){
//    this.io = io;
//}
//
//Output.prototype.sendMessageToUser = function(msg, user){
//    this.io.to(user.socketId).emit('chat message', msg);
//};
//
//Output.prototype.sendMessageToRoom = function(msg, room){
//
//};
//
//Output.prototype.broadcastMessage = function(msg){
//
//};

var Output = {
    sendMessageToUser: function (msg, user, io) {
        io.to(user.socketId).emit('chat message', msg);
    },

    sendMessageToRoom: function (msg, room, io) {
        for(var k in room.users){
            this.sendMessageToUser(msg, room.users[k], io);
        }
    },

    broadcastMessage: function (msg, io) {
        io.emit('chat message', msg);
    }
};

module.exports = Output;