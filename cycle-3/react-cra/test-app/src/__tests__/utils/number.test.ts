import { numberWithCommas } from '@src/utils/number';

describe('numberWithCommas function Test', () => {
  test('number', () => {
    expect(numberWithCommas(123456789)).toStrictEqual('123,456,789');
  });

  test('string', () => {
    expect(numberWithCommas('123456789')).toStrictEqual('123,456,789');
  });
});
