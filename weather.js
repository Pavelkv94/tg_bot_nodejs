// {
//     now: {
//       phenomena: 'Сплошная облачность',
//       falloutIcon: 'A10',
//       pressureTitle: '757 мм рт. ст.',
//       temperature: '+9',
//       windDirection: 'S',
//       wind: {
//         direction: [Object],
//         speed: [Array],
//         gustsSpeed: 0,
//         unstable: false
//       }
//     },
//     forecast: {
//       '2021-09-24': {
//         nightTemperature: [Object],
//         dayTemperature: [Object],
//         phenomena: 'Переменная облачность, небольшой дождь',
//         falloutIcon: 'D6',
//         weekend: '',
//         pressureTitle: '746 мм рт. ст.',
//         humidityTitle: '90%',
//         dateTextDayOfWeek: 'завтра',
//         dayOfMonth: '24',
//         windDirection: 'W',
//         wind: [Object]
//       },
//       '2021-09-25': {
//         nightTemperature: [Object],
//         dayTemperature: [Object],
//         phenomena: 'Переменная облачность, небольшой дождь',
//         falloutIcon: 'D6',
//         weekend: 'weekend',
//         pressureTitle: '755 мм рт. ст.',
//         humidityTitle: '90%',
//         dateTextDayOfWeek: 'суббота',
//         dayOfMonth: '25',
//         windDirection: 'W',
//         wind: [Object]
//       },
//       '2021-09-26': {
//         nightTemperature: [Object],
//         dayTemperature: [Object],
//         phenomena: 'Малооблачно, возможен дождь',
//         falloutIcon: 'D4',
//         weekend: 'weekend',
//         pressureTitle: '766 мм рт. ст.',
//         humidityTitle: '60%',
//         dateTextDayOfWeek: 'воскресенье',
//         dayOfMonth: '26',
//         windDirection: 'NW',
//         wind: [Object]
//       },
//       '2021-09-27': {
//         nightTemperature: [Object],
//         dayTemperature: [Object],
//         phenomena: 'Малооблачно, возможен дождь',
//         falloutIcon: 'D4',
//         weekend: '',
//         pressureTitle: '770 мм рт. ст.',
//         humidityTitle: '60%',
//         dateTextDayOfWeek: 'понедельник',
//         dayOfMonth: '27',
//         windDirection: 'NE',
//         wind: [Object]
//       },
//       '2021-09-28': {
//         nightTemperature: [Object],
//         dayTemperature: [Object],
//         phenomena: 'Малооблачно, небольшой дождь',
//         falloutIcon: 'D4',
//         weekend: '',
//         pressureTitle: '774 мм рт. ст.',
//         humidityTitle: '65%',
//         dateTextDayOfWeek: 'вторник',
//         dayOfMonth: '28',
//         windDirection: 'E',
//         wind: [Object]
//       }
//     },
//     today: {
//       date: '23 сентября',
//       day: {
//         phenomena: 'Ясно, дымка',
//         falloutIcon: 'B1',
//         temperature: '+6',
//         rusDateTime: 'днем'
//       },
//       evening: {
//         phenomena: 'Ясно',
//         falloutIcon: 'A2',
//         temperature: '+6',
//         rusDateTime: 'вечером'
//       },
//       night: {
//         phenomena: 'Облачно с прояснениями, умеренный дождь',
//         falloutIcon: 'D9',
//         temperature: '+9',
//         rusDateTime: 'ночью'
//       }
//     },
//     city: 'Минске'
//   }


const request = require('request');
const bot = require('./bot');
let id;
bot.on('message', async (msg) => {
    const text = msg.text;
    id = msg.chat.id
})

function getWeather() {
    let options = {
        url: "https://www.onliner.by/sdapi/pogoda/api/forecast",
    };

    let a = request.get(options, function (err, res, body) {
        let data = JSON.parse(body)
        let nowTemp = data.now.temperature
        let nowWeather = data.now.phenomena
        let date = data.today.date
        let dayTemp = data.today.day.temperature
        let dayWeather = data.today.day.phenomena
        let evTemp = data.today.evening.temperature
        let evWeather = data.today.evening.phenomena
        
        bot.sendMessage(id,
            `🚀 Доброе утро! 🚀
         Сегодня ${date}, прямо сейчас ${nowTemp}, ${nowWeather}. 🧐
         🌞 Днем ${dayTemp}, ${dayWeather}. 
         🌓 Вечером ${evTemp}, ${evWeather}.`)
    }
    )
}

module.exports = getWeather;