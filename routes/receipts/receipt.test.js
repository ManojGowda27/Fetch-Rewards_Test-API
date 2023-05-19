const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./receipt');


chai.use(chaiHttp);
const expect = chai.expect;

describe('Receipt Routes', () => {
  it('should return receipt points when GET /receipts/:id/points is called', (done) => {
    const receiptId = require('../../controllers/receipt'); 
    chai.request(app)
      .get(`/receipts/${receiptId}/points`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add additional assertions based on the expected response
        done();
      });
  });

  it('should process a receipt when POST /receipts/process is called', (done) => {
    const receiptData = {
      // Replace with valid receipt data for processing
    };
    chai.request(app)
      .post('/receipts/process')
      .send(receiptData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add additional assertions based on the expected response
        done();
      });
  });
});
