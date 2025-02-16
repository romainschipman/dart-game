import { parseFormattedScore } from "./parse-formatted-score";

describe("Unit test for readFormattedScore", () => {
    test.each([
        ["R1-P2-D3-T20", { round: 1, player: 2, dart: 3, score: "T20" }],
        ["R5-P1-D2-25", { round: 5, player: 1, dart: 2, score: "25" }],
        ["R2-P3-D1-B", { round: 2, player: 3, dart: 1, score: "B" }],
        ["R123-P45-D6-D10", { round: 123, player: 45, dart: 6, score: "D10" }],
    ])("should parse valid formatted score '%s'", (formattedScore, expected) => {
        const result = parseFormattedScore(formattedScore);
        expect(result).toEqual(expected);
    });

    test.each([
        ["INVALID", "Invalid formatted score: INVALID"],
        ["R1-P2-D-T20", "Invalid formatted score: R1-P2-D-T20"],
        ["R1-P2-D3-", "Invalid formatted score: R1-P2-D3-"],
        ["R1--D3-T20", "Invalid formatted score: R1--D3-T20"],
        ["R-P-D-T20", "Invalid formatted score: R-P-D-T20"],
    ])("should throw an error for invalid formatted score '%s'", (formattedScore, errorMessage) => {
        expect(() => parseFormattedScore(formattedScore)).toThrow(errorMessage);
    });
});

