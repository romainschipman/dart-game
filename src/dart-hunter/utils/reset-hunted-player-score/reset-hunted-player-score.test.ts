import { resetHuntedPlayerScore } from "./reset-hunted-player-score";

describe("resetHuntedPlayerScore", () => {
    it("should reset the score of the hunted player when they have the same score as the last player", () => {
        const playersScores = { p1: 50, p2: 50, p3: 30 };

        const updatedScores = resetHuntedPlayerScore(playersScores, "p1");

        expect(updatedScores).toEqual({ p1: 50, p2: 0, p3: 30 });
    });

    it("should not change scores if no player has the same score as the last player", () => {
        const playersScores = { p1: 50, p2: 40, p3: 30 };

        const updatedScores = resetHuntedPlayerScore(playersScores, "p1");

        expect(updatedScores).toEqual(playersScores);
    });

    it("should not change scores if the last player’s score is unique", () => {
        const playersScores = { p1: 50, p2: 40, p3: 30 };

        const updatedScores = resetHuntedPlayerScore(playersScores, "p3");

        expect(updatedScores).toEqual(playersScores);
    });

    it("should reset only the hunted player's score and not affect others", () => {
        const playersScores = { p1: 50, p2: 50, p3: 0 };

        const updatedScores = resetHuntedPlayerScore(playersScores, "p1");

        expect(updatedScores).toEqual({ p1: 50, p2: 0, p3: 0 });
    });


    it("should return the same object if lastPlayerPlayed is not in playersScores", () => {
        const playersScores = { p1: 50, p2: 50, p3: 30 };

        const updatedScores = resetHuntedPlayerScore(playersScores, "p4"); // p4 does not exist

        expect(updatedScores).toEqual(playersScores);
    });

    it("should return the same object if lastPlayerPlayed is an empty string", () => {
        const playersScores = { p1: 50, p2: 50, p3: 30 };

        const updatedScores = resetHuntedPlayerScore(playersScores, "");

        expect(updatedScores).toEqual(playersScores);
    });

    it("should return the same object if playersScores is empty", () => {
        const playersScores = {};

        const updatedScores = resetHuntedPlayerScore(playersScores, "p1");

        expect(updatedScores).toEqual({});
    });

    it("should return a new object and not mutate the original playersScores", () => {
        const playersScores = { p1: 50, p2: 50, p3: 30 };
        const playersScoresCopy = { ...playersScores };

        const updatedScores = resetHuntedPlayerScore(playersScores, "p1");

        expect(updatedScores).not.toBe(playersScores);
        expect(playersScores).toEqual(playersScoresCopy);
    });
});
