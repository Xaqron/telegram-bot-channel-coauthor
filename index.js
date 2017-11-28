const token = 'botToken' // https://t.me/BotFather
const channel = '@channelUsername' // should start with @
const interval = 30 // seconds

// Don't edit following lines
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(token, {polling: true})

let messages = []
console.log(`Posting 10 messages to channel ${channel}`)
bot.getChat(channel)
.then(async (chat) => {
  for (let i = 0; i < 10; i++) {
    let message = await bot.sendMessage(chat.id, `Example message number #${i}`)
    messages.push(message)
  }
  setTimeout(async () => {
    console.log(`Updating messages`)
    for (let m of messages) {
      await bot.editMessageText(m.text += ' updated', { chat_id: chat.id, message_id: m.message_id })
    }
    setTimeout(async () => {
      console.log(`Deleting messages`)
      for (let m of messages) {
        await bot.deleteMessage(chat.id, m.message_id)
      }
    }, interval * 1000)
  }, interval * 1000)
})
.catch((ex) => {
  console.log(`Error: ${ex}`)
})
