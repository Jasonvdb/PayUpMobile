/**
 * @format
 */

import displayCurrency from "../displayCurrency";

const testValues = [
  { providedValue: 12000, expectedResult: "12k sats" },
  { providedValue: 1200000, expectedResult: "1 200k sats" },
  { providedValue: 1234000, expectedResult: "1 234k sats" },
  { providedValue: 25, expectedResult: "25 sats" },
  { providedValue: 0, expectedResult: "0 sats" }

];

describe("displayCurrency(value)", () => {
  it("should format values", () => {
    for (let index = 0; index < testValues.length; index++) {
      const { providedValue, expectedResult } = testValues[index];
      const result = displayCurrency(providedValue);

      expect(result).toBe(expectedResult);
    }
  });
});
