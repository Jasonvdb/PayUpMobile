/**
 * @format
 */

import displayCurrency from "../displayCurrency";

const testValues = [
	{ providedValue: 0.0012, expectedResult: "120k sats" },
	{ providedValue: 0.012, expectedResult: "1 200k sats" },
	{ providedValue: 0.12, expectedResult: "12 000k sats" }
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
