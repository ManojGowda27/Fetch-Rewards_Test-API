const chai = require('chai');
const expect = chai.expect;
const totalPoints = require('./receipt');

describe('totalPoints', () => {
    it('should calculate the correct points', () => {
        const receipt = {
          retailer: 'ABC Store',
          total: '10',
          purchaseDate: '2023-05-19',
          purchaseTime: '15:30',
          items: [
            { shortDescription: 'Item 1', price: 5 },
            { shortDescription: 'Item 2', price: 8 },
            { shortDescription: 'Item 3', price: 12 }
          ]
        };
      
        const expectedPoints = 14; 
      
        const actualPoints = totalPoints(receipt);
      
        expect(actualPoints).to.equal(expectedPoints);
      });
  });