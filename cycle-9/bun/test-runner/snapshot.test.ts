import { test, expect } from "bun:test";

test("snapshot", async () => {
  expect({ a: 2 }).toMatchSnapshot();
});