/**
 * This example demonstrates using HTML5 games with Telegram.
 */
/* eslint-disable no-console */

const TOKEN = '1336052297:AAHwBo2c-EDCVBzvLGZm5P4G07DtAHeWl4k';
const gameName = 'di_sensat';
// Specify '0' to use ngrok i.e. localhost tunneling
let url = 'https://volcano350z.github.io';
const port = 8080;

const TelegramBot = require('../..');
const express = require('express');
const path = require('path');

const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();

// Basic configurations
app.set('view engine', 'ejs');

// Matches /start
bot.onText(/\/start/, function onPhotoText(msg) {
  bot.sendGame(msg.chat.id, gameName);
});

// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  bot.answerCallbackQuery(callbackQuery.id, { url });
});

// Render the HTML game
app.get('/', function requestListener(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Bind server to port
app.listen(port, function listen() {
  console.log(`Server is listening at http://localhost:${port}`);
});
