$(document).ready(function() {
	var socket = io();


	$('#question-form').submit(function (e) {
		e.preventDefault();
		socket.emit('send question', {
			username : username,
			question : $('#question').val()
		});
//		$('#question').val('');
		$('#question-container').hide();
		$('#messages-container').show();
	});

	$('#message-form').submit(function (e) {
		e.preventDefault();
		send_message();
	});

	// $("#message").keyup(function(e) {
 //        if(e.keyCode == 13) {
 //            $('#message-form').submit();
 //        }
 //    });

	socket.on('new message', function(data) {
		var message_class;
		if (data.username == username) {
			message_class = 'my-message';
		} else {
			message_class = 'other-message';
		}

		$('#messages').append($('<li class="' + message_class + '">').text(data.username + ': ' + data.message));
	});

	function send_message() {
		socket.emit('send message', {
			username : username,
			message : $('#message').val()
		});

		$('#message').val('');
	}
});

