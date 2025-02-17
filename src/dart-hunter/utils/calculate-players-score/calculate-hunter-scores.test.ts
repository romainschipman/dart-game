import { calculateHunterScores } from "./calculate-hunter-scores";
import * as utils from "../../../common/utils";

jest.mock("../../../common/utils", () => ({
    calculateDartPoints: jest.fn(),
    getMaxNumbers: jest.fn(),
    parseFormattedScore: jest.fn()
}));

describe("Unit test for calculateHunterScores", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should return an empty object when scores array is empty", () => {
        expect(calculateHunterScores([])).toEqual({});
    });

    test("should calculate scores correctly for multiple players", () => {
        jest.spyOn(utils, "parseFormattedScore").mockImplementation(score => {
            const mappings: Record<string, any> = {
                "R1-P1-D1-T20": { player: 1, score: "T20" },
                "R1-P2-D1-D10": { player: 2, score: "D10" },
                "R1-P1-D2-5": { player: 1, score: "5" }
            };
            return mappings[score];
        });

        jest.spyOn(utils, "calculateDartPoints").mockImplementation(score => {
            const mappings: Record<string, number> = {
                "T20": 60,
                "D10": 20,
                "5": 5
            };
            return mappings[score];
        });

        jest.spyOn(utils, "getMaxNumbers").mockReturnValue(2);

        const scores = ["R1-P1-D1-T20", "R1-P2-D1-D10", "R1-P1-D2-5"];
        const expectedResults = { p1: 65, p2: 20 };

        expect(calculateHunterScores(scores)).toEqual(expectedResults);
    });

    test("should calculate scores correctly for a single player", () => {
        jest.spyOn(utils, "parseFormattedScore").mockImplementation(score => {
            const mappings: Record<string, any> = {
                "R1-P1-D1-T20": { player: 1, score: "T20" },
                "R1-P1-D2-D10": { player: 1, score: "D10" }
            };
            return mappings[score];
        });

        jest.spyOn(utils, "calculateDartPoints").mockImplementation(score => {
            const mappings: Record<string, number> = {
                "T20": 60,
                "D10": 20,
            };
            return mappings[score];
        });

        jest.spyOn(utils, "getMaxNumbers").mockReturnValue(1);

        const scores = ["R1-P1-D1-T20", "R1-P1-D2-D10"];
        const expectedResults = { p1: 80 };

        expect(calculateHunterScores(scores)).toEqual(expectedResults);
    });

    test("should return zero score if all dart scores are invalid", () => {
        jest.spyOn(utils, "parseFormattedScore").mockImplementation(score => ({
            round: 1,
            dart: 1,
            player: 1,
            score
        }));

        jest.spyOn(utils, "calculateDartPoints").mockReturnValue(0);
        jest.spyOn(utils, "getMaxNumbers").mockReturnValue(1);

        const scores = ["R1-P1-D1-INVALID", "R1-P1-D2-INVALID"];
        const expectedResults = { p1: 0 };

        expect(calculateHunterScores(scores)).toEqual(expectedResults);
    });

    test("should handle cases where some players have no valid scores", () => {
        jest.spyOn(utils, "parseFormattedScore").mockImplementation(score => {
            const mappings: Record<string, any> = {
                "R1-P1-D1-T20": { player: 1, score: "T20" },
                "R1-P2-D1-INVALID": { player: 2, score: "INVALID" }
            };
            return mappings[score];
        });

        jest.spyOn(utils, "calculateDartPoints").mockImplementation(score => {
            const mappings: Record<string, number> = {
                "T20": 60,
                "INVALID": 0
            };
            return mappings[score];
        });

        jest.spyOn(utils, "getMaxNumbers").mockReturnValue(2);

        const scores = ["R1-P1-D1-T20", "R1-P2-D1-INVALID"];
        const expectedResults = { p1: 60, p2: 0 };

        expect(calculateHunterScores(scores)).toEqual(expectedResults);
    });

    test("should handle case where all players have the same score", () => {
        jest.spyOn(utils, "parseFormattedScore").mockImplementation(score => ({
            round: 1,
            dart: 1,
            player: parseInt(score.split("-P")[1].charAt(0)),
            score
        }));

        jest.spyOn(utils, "calculateDartPoints").mockReturnValue(50);
        jest.spyOn(utils, "getMaxNumbers").mockReturnValue(3);

        const scores = ["R1-P1-D1-BULL", "R1-P2-D1-BULL", "R1-P3-D1-BULL"];
        const expectedResults = { p1: 50, p2: 50, p3: 50 };

        expect(calculateHunterScores(scores)).toEqual(expectedResults);
    });

    test("should correctly compute scores even if player indexes are not sequential", () => {
        jest.spyOn(utils, "parseFormattedScore").mockImplementation(score => {
            const mappings: Record<string, any> = {
                "R1-P2-D1-T20": { player: 2, score: "T20" },
                "R1-P4-D1-D10": { player: 4, score: "D10" }
            };
            return mappings[score];
        });

        jest.spyOn(utils, "calculateDartPoints").mockImplementation(score => {
            const mappings: Record<string, number> = {
                "T20": 60,
                "D10": 20
            };
            return mappings[score];
        });

        jest.spyOn(utils, "getMaxNumbers").mockReturnValue(4);

        const scores = ["R1-P2-D1-T20", "R1-P4-D1-D10"];
        const expectedResults = { p1: 0, p2: 60, p3: 0, p4: 20 };

        expect(calculateHunterScores(scores)).toEqual(expectedResults);
    });

    test("should call the computeValue callback inside getMaxNumbers", () => {
        jest.restoreAllMocks();

        const spy = jest.spyOn(utils, "getMaxNumbers");

        jest.spyOn(utils, "parseFormattedScore").mockImplementation(score => {
            const mappings: Record<string, any> = {
                "R1-P1-D1-T20": { player: 1, score: "T20" },
                "R1-P2-D1-D10": { player: 2, score: "D10" },
                "R1-P1-D2-5": { player: 1, score: "5" }
            };
            return mappings[score];
        });

        const scores = ["R1-P1-D1-T20", "R1-P2-D1-D10", "R1-P1-D2-5"];

        calculateHunterScores(scores);

        expect(spy).toHaveBeenCalledTimes(1);

        expect(spy.mock.calls[0][1]).toBeInstanceOf(Function);
        const computeValue = spy.mock.calls[0][1];
        expect(computeValue).not.toBeUndefined();

        if(computeValue) {
            expect(computeValue({ player: 1, score: "T20" })).toBe(1);
            expect(computeValue({ player: 2, score: "D10" })).toBe(2);
            expect(computeValue({ player: 1, score: "5" })).toBe(1);
        }
    });



});
