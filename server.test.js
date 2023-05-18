const { expect } = require('chai')
const request = require('supertest');
const express = require('express');
const processReceiptRouter = require('./routes/processReceipt');
const getPointsRouter = require('./routes/getPoints');

const app = express();
app.use(express.json());

// Mount the route files as middleware
app.use('/receipts/process', processReceiptRouter);
app.use('/receipts/:id/points', getPointsRouter);

describe('Server', () => {
  describe('POST /receipts/process', () => {
    it('should process a receipt and return an ID', (done) => {
      const receipt = {
        "retailer": "Target",
        "purchaseDate": "2022-01-01",
        "purchaseTime": "13:01",
        "items": [
          {
            "shortDescription": "Mountain Dew 12PK",
            "price": "6.49"
          },{
            "shortDescription": "Emils Cheese Pizza",
            "price": "12.25"
          },{
            "shortDescription": "Knorr Creamy Chicken",
            "price": "1.26"
          },{
            "shortDescription": "Doritos Nacho Cheese",
            "price": "3.35"
          },{
            "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
            "price": "12.00"
          }
        ],
        "total": "35.35"
      };

      request(app)
        .post('/receipts/process')
        .send(receipt)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);

          const { id } = res.body;
          expect(id).toBeDefined(); // Verify that the response contains an ID

          done();
        });
    });
  });

  describe('GET /receipts/:id/points', () => {
    it('should get the points awarded for a receipt', (done) => {
      const receiptId = '7fb1377b-b223-49d9-a31a-5a02701dd310'; // Replace with a valid receipt ID

      request(app)
        .get(`/receipts/${receiptId}/points`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);

          const { points } = res.body;
          expect(points).toBe(28); // Verify that the response contains the points

          done();
        });
    });
  });
});
