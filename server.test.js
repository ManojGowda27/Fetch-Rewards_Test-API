const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const chaiHttp = require('chai-http');
const app = require('./server'); 

chai.use(chaiHttp);

describe('Server', () => {
    it('should respond with "Listening to Server on Port: 8000"', (done) => {
      chai.request(app)
        .get('/receipts')
        .end((err, res) => {
          chai.expect(res.text).to.equal('Listening to Server on Port: 8000');
          done();
        });
    });
  });
