$(document).ready(function() {
	var socket = io();

	$('button').click(function() {

	})
	$('form').submit(function send_message() {
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});

	$("#m").keyup(function(e) {
        if(e.keyCode == 13) {
            $('form').submit(send_message());
        }
    });

	socket.on('chat message', function(msg) {
		$('#messages').append($('<li>').text(msg));
	});
});

