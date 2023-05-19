const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const { mockReceiptById, mockProcessReceipt} = require('../../__mocks__/mocks')

chai.use(chaiHttp);
const {expect} = chai;

describe('Receipt Routes', () => {
  let app;
  let server;
  const receiptId = 'test-id';

  before(() => {
    app = express();

    app.get(`/receipts/${receiptId}/points`, mockReceiptById);
    app.post('/receipts/process', mockProcessReceipt)

    // Start the server
    server = app.listen(3000);
  });

  after(() => {
    // Stop the server
    server.close();
  });
  it('should return receipt points when GET /receipts/:id/points is called', (done) => {
    chai.request(app)
      .get(`/receipts/${receiptId}/points`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('points', 100);
        done();
      });
  });

  it('should process a receipt when POST /receipts/process is called', (done) => {
    const receiptData = {
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
    chai.request(app)
      .post('/receipts/process')
      .send(receiptData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        // Add additional assertions based on the expected response
        done();
      });
  });
});
