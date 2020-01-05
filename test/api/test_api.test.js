const expect = require('chai').expect;

describe('API Test', () => {
  it('Should work - api test', () => {
    const a = 4;
    const b = 4;
    const sum = a + b;
    expect(sum).to.equal(8);
  });
});
