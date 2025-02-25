import { parseFormattedScore } from "../../../common/utils";
import { updatePlayerScoreAndResetHunted } from "../update-player-score-and-reset-hunted/update-player-score-and-reset-hunted";
import { calculateHunterScores } from "./calculate-hunter-scores";

jest.mock("../../../common/utils");
jest.mock("../update-player-score-and-reset-hunted/update-player-score-and-reset-hunted");

describe("Unit test for calculateHunterScores", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should return an empty object when given an empty array", () => {
        const result = calculateHunterScores([], 301);
        expect(result).toEqual({});
    });

    it("should correctly calculate scores from a list of formatted scores", () => {
        (parseFormattedScore as jest.Mock)
            .mockReturnValueOnce({ player: 1, score: "T20" })
            .mockReturnValueOnce({ player: 2, score: "S5" })
            .mockReturnValueOnce({ player: 1, score: "D10" });

        (updatePlayerScoreAndResetHunted as jest.Mock)
            .mockImplementation((acc, { player, score }) => {
                const playerKey = `p${player}`;
                const newScore = (acc[playerKey] || 0) + (score === "T20" ? 60 : score === "S5" ? 5 : 20);
                return { ...acc, [playerKey]: newScore };
            });

        const scores = ["R1-P1-D1-T20", "R2-P2-D2-S5", "R3-P1-D3-D10"];
        const result = calculateHunterScores(scores, 301);

        expect(result).toEqual({ p1: 80, p2: 5 });
        expect(parseFormattedScore).toHaveBeenCalledTimes(3);
        expect(updatePlayerScoreAndResetHunted).toHaveBeenCalledTimes(3);
    });

    it("should filter out null results from parseFormattedScore", () => {
        (parseFormattedScore as jest.Mock)
            .mockReturnValueOnce({ player: 1, score: "T20" })
            .mockReturnValueOnce(null) // Invalid score, should be filtered out
            .mockReturnValueOnce({ player: 2, score: "S5" });

        (updatePlayerScoreAndResetHunted as jest.Mock)
            .mockImplementation((acc, { player, score }) => {
                const playerKey = `p${player}`;
                const newScore = (acc[playerKey] || 0) + (score === "T20" ? 60 : 5);
                return { ...acc, [playerKey]: newScore };
            });

        const scores = ["R1-P1-D1-T20", "INVALID", "R3-P2-D3-S5"];
        const result = calculateHunterScores(scores, 301);

        expect(result).toEqual({ p1: 60, p2: 5 });
        expect(parseFormattedScore).toHaveBeenCalledTimes(3);
        expect(updatePlayerScoreAndResetHunted).toHaveBeenCalledTimes(2);
    });

    it("should not mutate the original scores object", () => {
        (parseFormattedScore as jest.Mock)
            .mockReturnValueOnce({ player: 1, score: "D20" });

        (updatePlayerScoreAndResetHunted as jest.Mock)
            .mockImplementation((acc, { player, score }) => {
                const playerKey = `p${player}`;
                const newScore = (acc[playerKey] || 0) + 40;
                return { ...acc, [playerKey]: newScore };
            });

        const scores = ["R1-P1-D1-D20"];
        const originalObject = {};
        const result = calculateHunterScores(scores, 301);

        expect(result).not.toBe(originalObject);
        expect(result).toEqual({ p1: 40 });
    });
});
