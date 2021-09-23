const TelegramApi = require("node-telegram-bot-api");
//наш токен
const token = '2003087080:AAHycENSvEw7GQWyGBt3XWNtuFBFJHDc_js'
//создали бота
const bot = new TelegramApi(token, { polling: true })

module.exports = bot