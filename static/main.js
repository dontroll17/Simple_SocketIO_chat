const socket = io();

/**
 *Get chat elements
 **/
const form = document.getElementById('form');
const input = document.getElementById('input');


/**
 *Registers an event handler for the form
 **/
form.addEventListener('submit', (e) => {
	e.preventDefault();
	if (input.value) {
		socket.emit('chat message', input.value);
		input.value = '';
	}
});

/**
 *Listening to the event
 **/
socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
