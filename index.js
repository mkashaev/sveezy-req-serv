
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const config = require('./config-example.js')()

const port = process.env.PORT || 5000
const token = process.env.TOKEN || config.TOKEN
const chatId = process.env.CHAT_ID || config.CHAT_ID

app.use(cors({
  origin: 'http://sveezy.com'
}))

app.get('/', (req, res) => {
  res.send("Hi :)")
})

app.get('/form', async (req, res) => {
  const form = req.query.form
  const text = `Text: ${form}`
  const URL = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`
  
  try {
    await axios.get(URL, { timeout: 20 * 1000 })
    res.send("Message is sent!")
  } catch (err) {
    console.log("Error: ", err.message)
    res.send(`Error: ${err.message}`)
  }
})

app.listen(port, () => {
  console.log("The server is listening to port " + port)
})

