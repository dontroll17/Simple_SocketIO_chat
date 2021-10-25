const { Telegraf } = require('telegraf');
const botConfig = require('../config/telegramBotConfig');
const bot = new Telegraf(botConfig.token);

bot.launch().then(() => console.log('Success bot launch'));
module.exports = bot;