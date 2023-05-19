const {v4: uuidv4} = require('uuid')

const { validate } = require('../util/validate')

let receipts = new Map()

exports.receiptById = (req, res) => {
    const {id} = req.params
    
    if (!receipts.has(id)) {
        res.status(400).json('receipt_id not found');
    }

    return res.status(200).json({points: receipts.get(id)});
};

exports.processReceipt = (req, res) => {
    const receiptId = uuidv4()
    const receiptInfo = req.body

    const errors = validate(receiptInfo)
    if (errors.size != 0) {
        return res.status(400).json(Object.fromEntries(errors))
    }

    const points = totalPoints(receiptInfo)
    receipts.set(receiptId, points)

    return res.status(200).json({id: receiptId})
}

function totalPoints(receipt) {
    let points = 0
    
    const retailerName = receipt.retailer
    const total = parseFloat(receipt.total)
    const purchasedDate = new Date(receipt.purchaseDate)
    const purchaseTime = receipt.purchaseTime
    const [hours, minutes] = purchaseTime.split(':');

    const purchasedTime = new Date();
    purchasedTime.setHours(hours);
    purchasedTime.setMinutes(minutes);
 
    // Rule 1 : One point for every alphanumeric character in the retailer name.
    const alphaNumericRegex = /[a-zA-Z0-9]+/g;
    const alphaNumericChars = retailerName.match(alphaNumericRegex);
    const alphaNumericRetailerName = alphaNumericChars.join('')
    points += alphaNumericRetailerName.length
 
    //Rule 2: 50 points if the total is a round dollar amount with no cents.
    if(Number.isInteger(total)) {
        points += 50
    }
    
    // Rule 3: 25 points if the total is a multiple of 0.25.
    if(total % 0.25 === 0) {
        points += 25
    }
 
   // Rule 4: 5 points for every two items on the receipt.
   const totalItems = receipt.items.length
   points += Math.floor(totalItems / 2) * 5
 
   // Rule 5 : If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
   for (const item of receipt.items) {
     const itemLength = item.shortDescription.trim().length;
     if (itemLength % 3 === 0) {
       const extraPoints = Math.ceil(item.price * 0.2);
       points += extraPoints;
     }
   }
 
   // Rule 6: 6 points if the day in the purchase date is odd
   if (parseInt(purchasedDate.getDay()) % 2 !== 0) {
    points += 6;
   }
  
   // Rule 7: 10 points if the time of purchase is after 2:00pm and before 4:00pm
   const timeOfPurchase = purchasedTime.getHours() + purchasedTime.getMinutes() / 60;
   if (timeOfPurchase > 14 && timeOfPurchase < 16) {
    points += 10;
   }
 
   return points
 }

