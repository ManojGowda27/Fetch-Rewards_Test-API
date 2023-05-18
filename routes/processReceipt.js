const express = require('express')
const router = express.Router()
const uid = require('uniqid')

// To store receipts
const receipts = {};

router.post('/', (req, res) => {
    const receipt = req.body;

    // Generating ID for the receipt 
    const receiptId = uid();

    //Storing receipt and ID
    receipts[receiptId] = receipt;

    // Response
    res.json({id: receiptId});
})

// Exporting the router
module.exports = router