/**
 * Created by Allen on 3/24/2015.
 */
var socket = io();

$('form').submit(function () {
    var $m = $('#m');
    socket.emit('chat message', {message: $m.val()});
    $m.val('');
    return false;
});

socket.on('chat message', function (msg) {
    appendMsg(msg);
});

var appendMsg = function(msg){
    console.log(msg);

    if(msg.constructor === Array){
        for(var i = 0; i < msg.length; i++){
            $('#messages').append($('<li>').text(msg[i]));
        }
    }
    else {
        $('#messages').append($('<li>').text(msg));
    }
};