
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
        var msgtext = '';
        for(var i = 0; i < msg.length; i++){
            msgtext += msg[i] + '<br/>';
        }
        $('#messages').append($('<li>').html(msgtext));
    }
    else {
        $('#messages').append($('<li>').text(msg));
    }
};