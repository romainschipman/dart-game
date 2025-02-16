import { formatScore } from "./format-score";

describe("Unit test for formatScore", () => {
    it.each([
        [1, 1, 1, "T20", "R1-P1-D1-T20"],
        [2, 3, 2, "D10", "R2-P3-D2-D10"],
        [5, 2, 3, "B", "R5-P2-D3-B"],
        [10, 4, 1, "25", "R10-P4-D1-25"]
    ])(
        "should format score correctly for round %d, player %d, dart %d, and points %s",
        (round, player, dart, points, expected) => {
            const result = formatScore(round, player, dart, points);
            expect(result).toBe(expected);
        }
    );
});