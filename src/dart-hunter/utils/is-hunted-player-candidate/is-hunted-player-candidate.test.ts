import { isHuntedPlayerCandidate } from "./is-hunted-player-candidate";

describe("Unit test for isHuntedPlayerCandidate", () => {
    it("should return true when the player has the same score as the last player and is not the last player", () => {
        const playersScores = { p1: 50, p2: 50, p3: 30 };

        const result = isHuntedPlayerCandidate({
            player: "p2",
            score: 50,
            lastPlayerPlayed: "p1",
            lastPlayerScore: 50,
            playersScores,
        });

        expect(result).toBe(true);
    });

    it("should return false when the player has a different score from the last player", () => {
        const playersScores = { p1: 50, p2: 50, p3: 30 };

        const result = isHuntedPlayerCandidate({
            player: "p3",
            score: 30,
            lastPlayerPlayed: "p1",
            lastPlayerScore: 50,
            playersScores,
        });

        expect(result).toBe(false);
    });

    it("should return false when the player is the last player who played", () => {
        const playersScores = { p1: 50, p2: 50, p3: 30 };

        const result = isHuntedPlayerCandidate({
            player: "p1",
            score: 50,
            lastPlayerPlayed: "p1",
            lastPlayerScore: 50,
            playersScores,
        });

        expect(result).toBe(false);
    });

    it("should return false when the player has a score of zero", () => {
        const playersScores = { p1: 50, p2: 0, p3: 30 };

        const result = isHuntedPlayerCandidate({
            player: "p2",
            score: 0,
            lastPlayerPlayed: "p1",
            lastPlayerScore: 50,
            playersScores,
        });

        expect(result).toBe(false);
    });

    it("should return false when there are no players with the same score as the last player", () => {
        const playersScores = { p1: 50, p2: 40, p3: 30 };

        const result = isHuntedPlayerCandidate({
            player: "p2",
            score: 40,
            lastPlayerPlayed: "p1",
            lastPlayerScore: 50,
            playersScores,
        });

        expect(result).toBe(false);
    });
});
