const express = require('express')
const processReceiptRouter = require('./routes/processReceipt')
const getPointsRouter = require('./routes/getPoints')
const app = express()


app.use(express.json())

// Using the route files as middleware

app.use('/receipts/process', processReceiptRouter)
app.use('/receipts/:id/points', getPointsRouter)

   

app.listen(3000, () => console.log('Server Started'))

module.exports = app