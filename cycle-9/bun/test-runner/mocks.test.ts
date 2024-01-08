import { test, expect, jest, mock } from "bun:test";
const random1 = mock(() => Math.random());
const random2 = jest.fn(() => Math.random());

test("bun mock", async () => {
    const val = random1();
    expect(val).toBeGreaterThan(0);
    expect(random1).toHaveBeenCalled();
    expect(random1).toHaveBeenCalledTimes(1);
  });

test("jest.mock", async () => {
  const val = random2();
  expect(val).toBeGreaterThan(0);
  expect(random2).toHaveBeenCalled();
  expect(random2).toHaveBeenCalledTimes(1);
});