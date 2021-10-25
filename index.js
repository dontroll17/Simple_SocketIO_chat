const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 3333;
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bot = require('./App/TelegramBot');
const botConfig = require("./config/telegramBotConfig");


/**
 *Array of users
 **/
const users = [];
/**
 * Providing static files
 **/
app.use(express.static('static'));

/**
 *Routing
 **/
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

/**
 *Event listening
 **/
io.on('connection', (socket) => {
	users.push(socket.id);
	socket.on('chat message', (msg) => {
		io.emit('chat message',`${socket.id}: ${msg}`);
		bot.telegram.sendMessage(botConfig.sender, msg);
  	});
  	socket.on('disconnect', () => {
  		io.emit('chat message',`${socket.id} disconnected`)
  		removeUser(users, socket.id);
  	});
});


/**
 * Chat bot handlers
 **/
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

/**
 *Start server
 **/
server.listen(port, () => console.log(`listening on ${port}`));



const removeUser = (array, id) => {
	for(let i = 0; i < array.length; i++){
		if(array[i] === id){
			array.splice(i, 1);
		}
	}
}