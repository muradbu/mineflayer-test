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

const commands = [
    {
        name: 'players',
        message: 'Players online: ',
        explanation: 'Shows the players online',
        function: () => {
            console.table(Object.values(bot.players).map(player => ({
                username: player.username,
                ping: player.ping,
                uuid: player.uuid,
                gamemode: player.gamemode,
                position: player.entity?.position?.x + ', ' + player.entity?.position?.y + ', ' + player.entity?.position?.z
            })))
        }
    },
    {
        name: 'stop',
        message: 'Stopping bot...',
        explanation: 'Stops the bot',
        function: () => {
            bot.end()
        }
    },
    {
        name: 'help',
        message: '',
        explanation: 'Shows this help menu',
        function: () => {
            console.log("Start a message with '-' to use a command");
            const commandArray = commands.map(command => {
                return {
                    command: command.name,
                    explanation: command.explanation
                }
            })
            console.table(commandArray)
        }
    }
]

function chat() {
    inquirer.prompt(question).then(answers => {
        if (answers.message.startsWith('-')) {
            const command = answers.message.split(' ')[0].slice(1)
            const commandObject = commands.find(c => c.name === command)

            if (commandObject) {
                console.log(commandObject.message);
                commandObject.function()
                chat()
            } else {
                console.log('MINESTRESSER: Invalid command. Run -help for a list of commands')
                chat()
            }
        } else {
            bot.chat(answers.message)
            chat()
        }
    })
}