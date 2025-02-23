import * as commonUtils from "../../../../utils";
import { extractPlayerRoundScores } from "./extract-player-round-scores";
import { ParsedScore } from "../../../../interfaces";

describe("Unit test for extractPlayerRoundScores", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it("should return an empty object when scoreHistory is empty", () => {
        const result = extractPlayerRoundScores({ scoreHistory: [], playersCount: 2, currentRound: 1 });
        expect(result).toEqual({ p1: [], p2: [] });
    });

    it("should return empty arrays for all players if no scores exist", () => {
        const result = extractPlayerRoundScores({
            scoreHistory: [],
            playersCount: 3,
            currentRound: 2
        });

        expect(result).toEqual({ p1: [], p2: [], p3: [] });
    });

    it("should extract scores for the current round when available", () => {
        jest.spyOn(commonUtils, "parseFormattedScore").mockImplementation(entry => ({ score: entry.split("-")[3] } as ParsedScore));

        const scoreHistory = ["R2-P1-D1-T20", "R2-P2-D2-D10", "R1-P1-D1-S5"];

        const result = extractPlayerRoundScores({
            scoreHistory,
            playersCount: 2,
            currentRound: 2
        });

        expect(result).toEqual({ p1: ["T20"], p2: ["D10"] });
    });

    it("should extract scores from the previous round if no scores exist in the current round", () => {
        jest.spyOn(commonUtils, "parseFormattedScore").mockImplementation(entry => ({ score: entry.split("-")[3] } as ParsedScore));

        const scoreHistory = ["R1-P1-D1-T20", "R1-P2-D2-D10"];

        const result = extractPlayerRoundScores({
            scoreHistory,
            playersCount: 2,
            currentRound: 2
        });

        expect(result).toEqual({ p1: ["T20"], p2: ["D10"] });
    });

    it("should return an empty array for players without scores in any round", () => {
        jest.spyOn(commonUtils, "parseFormattedScore").mockImplementation(entry => ({ score: entry.split("-")[3] } as ParsedScore));

        const scoreHistory = ["R1-P1-D1-T20"];

        const result = extractPlayerRoundScores({
            scoreHistory,
            playersCount: 3,
            currentRound: 2
        });

        expect(result).toEqual({ p1: ["T20"], p2: [], p3: [] });
    });

    it("should handle cases where parseFormattedScore returns null", () => {
        jest.spyOn(commonUtils, "parseFormattedScore").mockImplementation(() => null);

        const scoreHistory = ["R2-P1-D1-T20", "R1-P1-D1-S5"];

        const result = extractPlayerRoundScores({
            scoreHistory,
            playersCount: 1,
            currentRound: 2
        });

        expect(result).toEqual({ p1: ["0"] });
    });

    it("should not mutate the original scoreHistory array", () => {
        jest.spyOn(commonUtils, "parseFormattedScore").mockImplementation(entry => ({ score: entry.split("-")[3] } as ParsedScore));

        const scoreHistory = ["R1-P1-D1-T20"];
        const scoreHistoryCopy = [...scoreHistory];

        extractPlayerRoundScores({
            scoreHistory,
            playersCount: 1,
            currentRound: 2
        });

        expect(scoreHistory).toEqual(scoreHistoryCopy);
    });
});
