import { test, expect, jest } from "bun:test";

test("snapshot", async () => {
  console.log(jest)
  expect({ a: 3 }).toMatchSnapshot();
});