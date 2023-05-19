const assert = require('assert');
const { validate } = require('./validate');

describe('validate', () => {
  it('should return errors for invalid receipt info', () => {
    const invalidReceipt = {
      retailer: '',
      purchaseDate: '2022-01-01',
      purchaseTime: '15:30',
      total: '',
      items: [
        { shortDescription: '', price: '' },
        { shortDescription: 'Item 2', price: '3.49' },
      ],
    };

    const expectedErrors = new Map([
      ['retailer', 'provide non-empty retailer value'],
      ['total', 'provide valid total number value'],
      ['items.shortDescription', 'provide non-empty value'],
      ['items.price', 'provide non-empty value'],
    ]);

    const errors = validate(invalidReceipt);

    assert.deepStrictEqual(errors, expectedErrors);
  });

  it('should return an empty map for a valid receipt info', () => {
    const validReceipt = {
      retailer: 'ABC Store',
      purchaseDate: '2022-01-01',
      purchaseTime: '15:30',
      total: '10.99',
      items: [
        { shortDescription: 'Item 1', price: '5.99' },
        { shortDescription: 'Item 2', price: '3.49' },
      ],
    };

    const expectedErrors = new Map();

    const errors = validate(validReceipt);

    assert.deepStrictEqual(errors, expectedErrors);
  });
});
