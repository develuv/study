import { describe, expect, test } from "bun:test";
import { add, subtract, multiply, divide } from './math';

describe('Math operations', () => {
  test('add', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
    // Add more test cases as needed
  });

  test('subtract', () => {
    expect(subtract(5, 2)).toBe(3);
    expect(subtract(10, 5)).toBe(5);
    // Add more test cases as needed
  });

  test('multiply', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(0, 5)).toBe(0);
    // Add more test cases as needed
  });

//   test('divide', () => {
//     expect(divide(4, 2)).toBe(2);
//     expect(divide(10, 5)).toBe(2);
//     // Add more test cases as needed
//   });

  // Additional test cases can be added for edge cases or specific scenarios
});