
const schedule = require('node-schedule');
const { gameOptions, againOptions } = require('./options')
const mongoose = require('mongoose');
const runMongo = require("./mongo");
const request = require('request');
const getWeather = require("./weather");
const bot = require('./bot');

let state = {
    weather: {
        currentTemperature: "",
        weather: ""
    }
}

runMongo()

// await mongoose.connect('mongodb+srv://pavelkv94:157842@clusterfortgbot.hi5sp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');




function sendTime(time, msg, text) {
    new schedule.scheduleJob({ start: new Date(Date.now() + Number(time) * 1000 * 60), end: new Date(new Date(Date.now() + Number(time) * 1000 * 60 + 1000)), rule: '*/1 * * * * *' }, function () {
        bot.sendMessage(msg.chat.id, text);
        console.log("TIMER")
    });
}


//Устанавливаем основные команды для бота с описанием
bot.setMyCommands([
    { command: '/start', description: "start" },
    { command: '/weather', description: "weather" },
    { command: '/game1', description: "game on random number" },
    { command: '/send', description: "send" },
])



//for game
const chats = {}


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`);
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const botAction = () => {
  //communicate
    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id
        try {
            if (text === '/start') {
                await bot.sendMessage(chatId, `Приветствую тебя ${msg.from.first_name}! Я твой личный ассистент. Пока нахожусь в демо-версии поэтому могу тупить)`)
                return bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/9ef/db1/9efdb148-747f-30f8-9575-7f6e06d34bac/7.webp")
            }
            if (text === '/weather') {
              return   getWeather();
            }
            if (text === "/game1") {
                return startGame(chatId)
            }
            if (text === "/send") {
                return bot.onText(RegExp(text), msg => {
                    sendTime(0.1, msg, 'Этот текст сработал через 6 секунд')
                })
            }

            return bot.sendMessage(chatId, "Я не понимаю тебя, попробуй еще раз!")
        }
        catch {
            return bot.sendMessage(chatId, "Ой! Произошла серьезная ошибка!")
        }

    })

    //for game
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        console.log("data is " + data + " chatsID " + chats[chatId])
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data === '/stopgame') {
            return bot.sendMessage(chatId, "Если захотите еще поиграть, обращайстесь.")
        }
        if (data == chats[chatId]) {
            await bot.sendMessage(chatId, `Поздравляю вы угадали цифру ${chats[chatId]}!!`, againOptions)
        } else {
            console.log(chats)
            await bot.sendMessage(chatId, `Вы не угадали!!, я загадал цифру ${chats[chatId]}, ваш ответ ${data}`, againOptions)
        }

    })
}

botAction();
