const express = require('express')
const app = express()
const uid = require('uniqid')

app.use(express.json())

// To store receipts and points

const receipts = {};

// Processing Receipts Endpoint

app.post('/receipts/process', (req, res) => {
    const receipt = req.body;

    // Generating ID for the receipt 
    const receiptId = uid();

    //Storing receipt and ID
    receipts[receiptId] = receipt;

    // Response
    res.json({id: receiptId});

})

// Fetching Points

app.get('/receipts/:id/points', (req, res) => {
    const receiptId = req.params.id;
    const receipt = receipts[receiptId];

    if(!receipt) {
        // When ID is not found
        res.status(404).json({error: 'Receipt not found'});
    } else {
        // Points Calculation
        const points = totalPoints(receipt)
        res.status(200).json({points: {points}})
    }
})

function totalPoints(receipt) {
   let points = 0
   
   const r_Name = receipt.retailer
   const total = receipt.total
   const p_Date = new Date(receipt.purchaseDate)

   // Rule 1 : One point for every alphanumeric character in the retailer name.
   points += r_Name.replace(/[^a-zA-Z0-9]/g, '').length


   //Rule 2: 50 points if the total is a round dollar amount with no cents.
   if(Number.isInteger(total))
        points += 50

   // Rule 3: 25 points if the total is a multiple of 0.25.
   if(total % 0.25 === 0)
    points += 25

  // Rule 4: 5 points for every two items on the receipt.
  const totalItems = receipt.items.length
  points += Math.floor(totalItems / 2) * 5

  // Rule 5 : If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
  for (const item of receipt.items) {
    const i_Length = item.description.trim().length;
    if (i_Length % 3 === 0) {
      const extraPoints = Math.ceil(item.price * 0.2);
      points += extraPoints;
    }
  }

  // Rule 6: 6 points if the day in the purchase date is odd
  if (purchaseDate.getDate() % 2 === 1)
    points += 6;
 
  // Rule 7: 10 points if the time of purchase is after 2:00pm and before 4:00pm
  const purchaseTime = purchaseDate.getHours() + purchaseDate.getMinutes() / 60;
  if (purchaseTime > 14 && purchaseTime < 16)
    points += 10;

  return points

}

app.listen(3000, () => console.log('Server Started'))

module.exports = app