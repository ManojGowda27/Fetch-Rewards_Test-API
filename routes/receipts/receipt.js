const express = require('express')
const router = express.Router()

const { receiptById, processReceipt } = require('../../controllers/receipt')

router.get("/:id/points", receiptById)
router.post("/process", processReceipt)

module.exports = router