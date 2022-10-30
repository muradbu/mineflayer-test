import dotenv from 'dotenv'
import mineflayer from 'mineflayer'
import inquirer from "inquirer"

dotenv.config()

const bot = mineflayer.createBot({
    host: process.env.HOST,
    port: process.env.PORT || 25565,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    auth: 'microsoft'
})

bot.on('chat', (username, message) => {
    if (username === bot.username) return
    console.log(`${username}: ${message}`);
})

bot.on('login', () => {
    chat()
})

const question = [
    {
        type: 'input',
        name: 'message',
        message: 'Chat: '
    }
]

function chat() {
    inquirer.prompt(question).then(answers => {
        bot.chat(answers.message)
        chat()
    })
}
