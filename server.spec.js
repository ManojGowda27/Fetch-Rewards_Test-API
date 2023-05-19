const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const router = express.Router()

const {mockProcessReceipt, mockReceiptById} = require('./__mocks__/mocks')

const { expect } = chai;


chai.use(chaiHttp);

describe('Receipts API', () => {
  let app;
  let server;
  const receiptId = 'test-id';

  router.get("/:id/points", mockReceiptById)
  router.post("/process", mockProcessReceipt)

  before((done) => {
    app = express();
    app.use('/receipts', router)
    server = app.listen(3000, done);
  });

  it('GET /receipts/:id/points', (done) => {
    chai.request(server)
      .get(`/receipts/${receiptId}/points`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('points', 100);
        done();
      });
  });

  it('POST /receipts/process', (done) => {
    const newReceipt = {
      retailer: 'Example Retailer',
      total: 100.0,
      items: ['Item 1', 'Item 2'],
    };

    chai.request(app)
      .post('/receipts/process')
      .send(newReceipt)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        done();
      });
  });
});