require('dotenv').config()
const mineflayer = require('mineflayer')
const prompt = require('prompt')

const bot = mineflayer.createBot({
    host: process.env.HOST,
    port: process.env.PORT || 25565,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    auth: 'microsoft'
})

bot.on('chat', (username, message) => {
    console.log(`${username}: ${message}`);
})

bot.on('login', () => {
    prompt.start()
    prompt.get('message', (err, result) => {
        bot.chat(result.message)

        if (err) {
            console.log("ERROR: ", err)
        }
    })
})