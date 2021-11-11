import DateFormatter from '@src/utils/DateFormatter';

describe('DateFormatter Public Member Field Test', () => {
  const date = new Date();
  let dateFormatter: DateFormatter;

  beforeAll(() => {
    jest.isolateModules(() => {
      dateFormatter = new DateFormatter(date);
    });
  });

  test('value', () => {
    expect(dateFormatter.value).toStrictEqual(date);
  });

  test('date', () => {
    expect(dateFormatter.date).toBe(date.getDate());
  });

  test('day', () => {
    expect(dateFormatter.day).toBe(date.getDay());
  });

  test('time', () => {
    expect(dateFormatter.time).toBe(date.getTime());
  });

  test('fullYear', () => {
    expect(dateFormatter.fullYear).toBe(date.getFullYear());
  });

  test('hours', () => {
    expect(dateFormatter.hours).toBe(date.getHours());
  });
});
