const express = require('express')

const receipts = require('./routes/receipts/receipt')
const app = express()

const port = 8000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Using the route files as middleware
app.use('/receipts', receipts)

app.listen(port, () => console.log(`Listening to Server on Port: ${port}`))

module.exports = app