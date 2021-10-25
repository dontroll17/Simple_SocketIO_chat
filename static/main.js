const app = new Vue({
	el: '#app',
	data: {
		inputValue: '',
		MessagesList: []
	},
	methods: {
		sendMessage() {
			if(this.inputValue === '') return;
			
			socket.emit('chat message', this.inputValue);
			this.inputValue = '';
		}
	}
})

const socket = io();
socket.on('chat message', msg => {
	app.MessagesList.push(msg);
});
