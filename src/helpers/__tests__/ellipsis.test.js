/**
 * @format
 */
import ellipsis from "../ellipsis";

const testValues = [
	{ providedValue: "Test", expectedResult: "Test", limit: undefined },
	{ providedValue: "Testing one two", expectedResult: "Testing on...", limit: undefined },
	{
		providedValue: "Testing one two three",
		expectedResult: "Testing one t...",
		limit: 13
	},
	{ providedValue: "1", expectedResult: "1", limit: undefined },
	{ providedValue: false, expectedResult: false, limit: undefined }
];

describe("ellipsis(value)", () => {
	it("should return shorted string", () => {
		for (let index = 0; index < testValues.length; index++) {
			const { providedValue, limit, expectedResult } = testValues[index];
			const result = ellipsis(providedValue, limit);
			expect(result).toBe(expectedResult);
		}
	});
});
