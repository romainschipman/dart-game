import { isHuntedPlayerCandidate } from "../is-hunted-player-candidate/is-hunted-player-candidate";

/**
 * Resets the score of a player who has been "hunted" in the Hunter 301 game mode.
 *
 * If the last player to play has the same score as another player (and that score is not zero),
 * the other player is considered "hunted" and their score is reset to zero.
 *
 * @param playersScores - An object mapping player identifiers (`"p1"`, `"p2"`, etc.) to their scores.
 * @param lastPlayerPlayed - The identifier of the last player who played (e.g., `"p1"`, `"p2"`).
 *
 * @example
 * ```ts
 * const playersScores = { p1: 50, p2: 50, p3: 30 };
 * resetHuntedPlayerScore(playersScores, "p3");
 * console.log(playersScores); // { p1: 50, p2: 50, p3: 30 } (no change, since p3's score is unique)
 *
 * const playersScores2 = { p1: 50, p2: 50, p3: 30 };
 * resetHuntedPlayerScore(playersScores2, "p1");
 * console.log(playersScores2); // { p1: 50, p2: 0, p3: 30 } (p2 is hunted and their score is reset)
 * ```
 */
const resetHuntedPlayerScore = (playersScores: Record<string, number>, lastPlayerPlayed: string) : Record<string, number> => {
    if (!lastPlayerPlayed || !(lastPlayerPlayed in playersScores)) {
        return playersScores;
    }

    const lastPlayerScore = playersScores[lastPlayerPlayed];

    const huntedPlayer = Object.entries(playersScores).find(([player, score]) => (
        isHuntedPlayerCandidate({ player, score, playersScores, lastPlayerPlayed, lastPlayerScore })
    ))?.[0];

    if (!huntedPlayer) {
        return playersScores;
    }

    return {
        ...playersScores,
        [huntedPlayer]: 0
    };
};

export { resetHuntedPlayerScore };