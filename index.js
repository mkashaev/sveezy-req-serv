
const express = require('express')
const axios = require('axios')
const app = express()
const port = process.env.PORT || 5000

// config.TOKEN
// config.CHAT_ID
const config = require('./config.js')()


app.get('/', (req, res) => {
  res.send("Hi :)")
})

app.get('/form', async (req, res) => {
  const form = req.query.form
  const text = `Text: ${form}`
  const URL = `https://api.telegram.org/bot${config.TOKEN}/sendMessage?chat_id=${config.CHAT_ID}&text=${text}`
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

