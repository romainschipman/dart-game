import { isValidDartboardNotation } from "./is-valid-dartboard-notation";

describe("Unit test for isValidDartboardNotation", () => {
    it.each([
        // Valid cases
        ["returns true for a valid triple notation (T20)", "T20", true],
        ["returns true for a valid double notation (D10)", "D10", true],
        ["returns true for a valid number notation (19)", "19", true],
        ["returns true for a valid double bullseye (DB)", "DB", true],
        ["returns true for a valid single bullseye (B)", "B", true],

        // Invalid cases
        ["returns false for an invalid triple with a negative number (T-1)", "T-1", false],
        ["returns false for an invalid random string (XYZ)", "XYZ", false],
        ["returns false for an incomplete triple notation (T)", "T", false],
        ["returns false for an empty string", "", false],
    ])("%s", (description, input, expected) => {
        expect(isValidDartboardNotation(input)).toBe(expected);
    });
});