require('dotEnv').config()
const {
  TelegramClient
} = require('telegram')
const {
  StringSession
} = require('telegram/sessions')
const input = require('input')


const stringSession = new StringSession('')
const telegramApiId = Number(process.env.TELEGRAM_API_ID)
const telegramApiHash = process.env.TELEGRAM_API_HASH
const client = new TelegramClient(stringSession, telegramApiId, telegramApiHash, {
  connectionRetries: 5,
})

const connectTelegram = async () => {
  await client.start({
    phoneNumber: async () => await input.text('Please enter your number: '),
    password: async () => await input.password('Please enter your password: '),
    phoneCode: async () => await input.text('Please enter the code you received: '),
    onError: (err) => console.log(err),
  })
  console.log('You should now be connected.')
  console.log(client.session.save()) // Save this string to avoid logging in again
}

connectTelegram()
