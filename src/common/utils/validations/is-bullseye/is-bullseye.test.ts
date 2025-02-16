import { isBullseye } from "./is-bullseye";

describe("Unit test for isBullseye", () => {
    test.each([
        ["returns true for a valid single bullseye (B)", "B", true],
        ["returns true for a valid double bullseye (DB)", "DB", true],
        ["returns false for a triple notation (T20)", "T20", false],
        ["returns false for a double notation (D10)", "D10", false],
        ["returns false for an empty string", "", false],
        ["returns false for a random string (XYZ)", "XYZ", false],
    ])("%s", (_, input, expected) => {
        expect(isBullseye(input)).toBe(expected);
    });
});
