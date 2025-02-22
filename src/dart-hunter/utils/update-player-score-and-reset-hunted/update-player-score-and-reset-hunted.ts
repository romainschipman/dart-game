import { calculateDartPoints } from "../../../common/utils";
import { ParsedScore } from "../../../common/interfaces";
import { resetHuntedPlayerScore } from "../reset-hunted-player-score/reset-hunted-player-score";

/**
 * Updates a player's score and applies the "Hunter 301" rule by resetting the hunted player's score if necessary.
 *
 * @param {Record<string, number>} scores - The current scores of all players, where keys are player identifiers (`p1`, `p2`, etc.).
 * @param {{ player: number; score: string }} params - An object containing the player identifier and the dartboard score.
 * @param {number} params.player - The player identifier (e.g., `1` for "p1").
 * @param {string} params.score - The score to be added (e.g., "T20", "D10").
 * @returns A new object with updated scores after applying the rule.
 *
 * @example
 * ```ts
 * const scores = { p1: 50, p2: 40 };
 * const updatedScores = updatePlayerScoreAndResetHunted(scores, { player: 1, score: "T20" });
 * console.log(updatedScores);
 * // Output: { p1: 110, p2: 40 } (if no player is "hunted")
 * ```
 */
const updatePlayerScoreAndResetHunted = (scores: Record<string, number>, { player, score }: ParsedScore) => {
    const playerKey = `p${player}`;
    const currentScore = (scores[playerKey] || 0) + calculateDartPoints(score);
    const updatedScores = { ...scores, [playerKey]: currentScore };
    return resetHuntedPlayerScore(updatedScores, playerKey);
}

export { updatePlayerScoreAndResetHunted };