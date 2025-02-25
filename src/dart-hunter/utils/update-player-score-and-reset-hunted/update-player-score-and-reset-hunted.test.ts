import { resetHuntedPlayerScore } from "../reset-hunted-player-score/reset-hunted-player-score";
import { calculateDartPoints } from "../../../common/utils";
import { updatePlayerScoreAndResetHunted } from "./update-player-score-and-reset-hunted";
import { ParsedScore } from "../../../common/interfaces";

jest.mock("../reset-hunted-player-score/reset-hunted-player-score");
jest.mock("../../../common/utils");

describe("updatePlayerScoreAndResetHunted", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should correctly update a player's score", () => {
        (calculateDartPoints as jest.Mock).mockReturnValue(20);
        (resetHuntedPlayerScore as jest.Mock).mockImplementation((scores) => scores);

        const scores = { p1: 50, p2: 40 };
        const update = { player: 1, score: "T20" } as ParsedScore;
        const targetScore = 301;

        const updatedScores = updatePlayerScoreAndResetHunted(scores, update, targetScore);

        expect(updatedScores).toEqual({ p1: 70, p2: 40 });
        expect(calculateDartPoints).toHaveBeenCalledWith("T20");
        expect(resetHuntedPlayerScore).toHaveBeenCalledWith({ p1: 70, p2: 40 }, "p1");
    });

    it("should correctly apply the Hunter 301 rule after updating the score", () => {
        (calculateDartPoints as jest.Mock).mockReturnValue(10);
        const targetScore = 55;
        (resetHuntedPlayerScore as jest.Mock).mockReturnValue({ p1: 50, p2: 0 });

        const scores = { p1: 50, p2: 50 };
        const update = { player: 1, score: "D5" } as ParsedScore;

        const updatedScores = updatePlayerScoreAndResetHunted(scores, update, targetScore);

        expect(updatedScores).toEqual({ p1: 50, p2: 0 });
        expect(resetHuntedPlayerScore).toHaveBeenCalledWith({ p1: 50, p2: 50 }, "p1");
    });

    it("should correctly initialize a new player's score", () => {
        (calculateDartPoints as jest.Mock).mockReturnValue(25);
        (resetHuntedPlayerScore as jest.Mock).mockImplementation((scores) => scores);

        const scores = { p1: 50 };
        const update = { player: 2, score: "25" } as ParsedScore;
        const targetScore = 301;

        const updatedScores = updatePlayerScoreAndResetHunted(scores, update, targetScore);

        expect(updatedScores).toEqual({ p1: 50, p2: 25 });
        expect(calculateDartPoints).toHaveBeenCalledWith("25");
        expect(resetHuntedPlayerScore).toHaveBeenCalledWith({ p1: 50, p2: 25 }, "p2");
    });

    it("should not mutate the original scores object", () => {
        (calculateDartPoints as jest.Mock).mockReturnValue(30);
        (resetHuntedPlayerScore as jest.Mock).mockImplementation((scores) => scores);

        const scores = { p1: 20 };
        const scoresCopy = { ...scores };
        const update = { player: 1, score: "D15" } as ParsedScore;
        const targetScore = 301;

        const updatedScores = updatePlayerScoreAndResetHunted(scores, update, targetScore);

        expect(updatedScores).not.toBe(scores);
        expect(scores).toEqual(scoresCopy);
    });
});
