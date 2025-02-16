import { isDartScoreValid } from "./is-dart-score-valid";

describe("Unit test for isDartScoreValid", () => {
    test.each([
        ["returns true for 19", 19, true],
        ["returns true for 0", 0, true],
        ["returns false for 21", 21, false],
        ["returns false for -1", -1, false],
    ])("%s", (_, input, expected) => {
        expect(isDartScoreValid(input)).toBe(expected);
    });
});
