// Using Assert to perform assertions and Validating the output
const assert = require('assert');
const {totalPoints} = require('server.js')

const receipt1 = {
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
  ]
};
const expectedPoints1 = 28;

const receipt2 = {
    "retailer": "M&M Corner Market",
    "purchaseDate": "2022-03-20",
    "purchaseTime": "14:33",
    "items": [
      {
        "shortDescription": "Gatorade",
        "price": "2.25"
      },{
        "shortDescription": "Gatorade",
        "price": "2.25"
      },{
        "shortDescription": "Gatorade",
        "price": "2.25"
      },{
        "shortDescription": "Gatorade",
        "price": "2.25"
      }
    ]
};
const expectedPoints2 = 109;

describe('Receipt Processor', () => {
  it('should calculate the correct points based on the provided rules', () => {
    const points1 = totalPoints(receipt1);
    const points2 = totalPoints(receipt2);
    assert.strictEqual(points1, expectedPoints1);
    assert.strictEqual(points2, expectedPoints2);
  });
});