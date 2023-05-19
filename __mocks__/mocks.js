  // Mock the receiptById function
exports.mockReceiptById = (req, res) => {
    // Simulate returning the points in the response
    const points = 100;
    return res.status(200).json({ points: points });
  };

   // Mock the receiptById function
exports.mockProcessReceipt = (req, res) => {
    const receiptId = 'test-id';
    // Simulate returning the points in the response
    return res.status(200).json({ id: receiptId });
  };