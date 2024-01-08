import { setSystemTime, beforeAll, test, expect, jest } from "bun:test";

beforeAll(() => {
  setSystemTime(new Date("2020-01-01T00:00:00.000Z"));
});

test("it is 2020", () => {
  expect(new Date().getFullYear()).toBe(2020);
});


// test("just like in jest", () => {
//     jest.useFakeTimers();
//     jest.setSystemTime(new Date("2020-01-01T00:00:00.000Z"));
//     expect(new Date().getFullYear()).toBe(2020);
//     jest.useRealTimers();
//     expect(new Date().getFullYear()).toBeGreaterThan(2020);
//   });
  
//   test("unlike in jest", () => {
//     const OriginalDate = Date;
//     jest.useFakeTimers();
//     if (typeof Bun === "undefined") {
//       // In Jest, the Date constructor changes
//       // That can cause all sorts of bugs because suddenly Date !== Date before the test.
//       expect(Date).not.toBe(OriginalDate);
//       expect(Date.now).not.toBe(OriginalDate.now);
//     } else {
//       // In bun:test, Date constructor does not change when you useFakeTimers
//       expect(Date).toBe(OriginalDate);
//       expect(Date.now).toBe(OriginalDate.now);
//     }
//   });


  test("it was 2020, for a moment.", () => {
    // Set it to something!
    setSystemTime(new Date("2020-01-01T00:00:00.000Z"));
    expect(new Date().getFullYear()).toBe(2020);
  
    // reset it!
    setSystemTime();
  
    expect(new Date().getFullYear()).toBeGreaterThan(2020);
  });


  test("Welcome to California!", () => {
    process.env.TZ = "America/Los_Angeles";
    expect(new Date().getTimezoneOffset()).toBe(480);
    expect(new Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(
      "America/Los_Angeles"
    );
  });
  
  test("Welcome to New York!", () => {
    // Unlike in Jest, you can set the timezone multiple times at runtime and it will work.
    process.env.TZ = "America/New_York";
    expect(new Date().getTimezoneOffset()).toBe(300);
    expect(new Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(
      "America/New_York"
    );
  });