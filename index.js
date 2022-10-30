require('dotenv').config()
const mineflayer = require('mineflayer')

mineflayer.createBot({
    host: process.env.HOST,
    port: process.env.PORT || 25565,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
})